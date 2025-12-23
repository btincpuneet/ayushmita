import React, { useState, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  FileText, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check,
  Eye,
  EyeOff,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  showWordCount?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  placeholder = "Start typing here...",
  minHeight = 180,
  showWordCount = true,
}) => {
  const [mode, setMode] = useState<"visual" | "html">("visual");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Calculate word and character count
  const stats = useMemo(() => {
    const textContent = value.replace(/<[^>]*>/g, "").trim();
    const words = textContent ? textContent.split(/\s+/).length : 0;
    const characters = textContent.length;
    return { words, characters };
  }, [value]);

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("HTML copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  // Insert image alignment helper
  const insertImageWithAlignment = (alignment: "left" | "center" | "right") => {
    const url = prompt("Enter image URL:");
    if (!url) return;

    let imgHtml = "";
    switch (alignment) {
      case "left":
        imgHtml = `<figure class="image image-style-align-left"><img src="${url}" alt="Image"></figure>`;
        break;
      case "right":
        imgHtml = `<figure class="image image-style-align-right"><img src="${url}" alt="Image"></figure>`;
        break;
      case "center":
        imgHtml = `<figure class="image image-style-align-center"><img src="${url}" alt="Image"></figure>`;
        break;
    }
    onChange(value + imgHtml);
  };

  const containerClass = isFullscreen
    ? "fixed inset-0 z-50 bg-background p-6 overflow-auto animate-fade-in"
    : "space-y-3";

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <label className="text-sm font-semibold text-foreground">{label}</label>

        <div className="flex items-center gap-2">
          {/* Mode Toggle */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as "visual" | "html")}>
            <TabsList className="h-9 bg-muted">
              <TabsTrigger value="visual" className="text-xs px-3 gap-1.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <FileText className="w-3.5 h-3.5" />
                Visual
              </TabsTrigger>
              <TabsTrigger value="html" className="text-xs px-3 gap-1.5 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <Code className="w-3.5 h-3.5" />
                HTML
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Copy Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 gap-1.5"
            onClick={handleCopyHTML}
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline text-xs">Copy</span>
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* VISUAL MODE */}
      {mode === "visual" && (
        <div className="border rounded-lg overflow-hidden bg-card shadow-card ckeditor-container">
          <CKEditor
            editor={ClassicEditor}
            data={value}
            config={{
              placeholder: placeholder,
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                "outdent",
                "indent",
                "|",
                "imageUpload",
                "blockQuote",
                "insertTable",
                "mediaEmbed",
                "|",
                "undo",
                "redo",
              ],
              heading: {
                options: [
                  { model: "paragraph" as const, title: "Paragraph", class: "ck-heading_paragraph" },
                  { model: "heading1" as const, view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
                  { model: "heading2" as const, view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
                  { model: "heading3" as const, view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
                  { model: "heading4" as const, view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
                ],
              },
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
            }}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                const root = editor.editing.view.document.getRoot();
                if (root) {
                  writer.setStyle(
                    "min-height",
                    `${isFullscreen ? 400 : minHeight}px`,
                    root
                  );
                }
              });
            }}
            onChange={(_, editor) => {
              onChange(editor.getData());
            }}
          />
        </div>
      )}

      {/* HTML MODE */}
      {mode === "html" && (
        <div className="space-y-4">
          {/* Image Alignment Quick Actions */}
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <span className="text-xs font-medium text-muted-foreground mr-2">Quick Insert:</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 gap-1.5"
              onClick={() => insertImageWithAlignment("left")}
            >
              <AlignLeft className="w-4 h-4" />
              <ImageIcon className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 gap-1.5"
              onClick={() => insertImageWithAlignment("center")}
            >
              <AlignCenter className="w-4 h-4" />
              <ImageIcon className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 gap-1.5"
              onClick={() => insertImageWithAlignment("right")}
            >
              <AlignRight className="w-4 h-4" />
              <ImageIcon className="w-3 h-3" />
            </Button>
          </div>

          {/* HTML Editor */}
          <div className="relative">
            <textarea
              className="w-full p-4 font-mono text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y shadow-card"
              style={{ minHeight: isFullscreen ? 400 : minHeight }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter HTML code... Paste your HTML content here with image alignments."
              spellCheck={false}
            />
          </div>

          {/* Preview Toggle */}
          {/* <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div> */}

          {/* Visual Preview */}
          {showPreview && value && (
            <div className="border rounded-lg overflow-hidden shadow-card">
              <div className="bg-muted px-4 py-2.5 border-b">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Live Preview</p>
              </div>
              <div
                className="p-6 bg-card cms-content"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </div>
          )}
        </div>
      )}

      {/* Footer Stats */}
      {showWordCount && (
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">{stats.words}</span> words
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">{stats.characters}</span> characters
            </span>
          </div>
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${mode === "visual" ? "bg-success" : "bg-info"}`}></span>
            <span className="font-medium capitalize">{mode} Mode</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
