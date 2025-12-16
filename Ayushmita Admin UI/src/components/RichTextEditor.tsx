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
  EyeOff
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
  placeholder,
  minHeight = 200,
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

  const containerClass = isFullscreen
    ? "fixed inset-0 z-50 bg-background p-6 overflow-auto"
    : "space-y-2";

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <label className="text-sm font-medium text-foreground">{label}</label>

        <div className="flex items-center gap-2">
          {/* Mode Toggle */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as "visual" | "html")}>
            <TabsList className="h-8">
              <TabsTrigger value="visual" className="text-xs px-3 h-6 gap-1">
                <FileText className="w-3 h-3" />
                Visual
              </TabsTrigger>
              <TabsTrigger value="html" className="text-xs px-3 h-6 gap-1">
                <Code className="w-3 h-3" />
                HTML
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Copy Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={handleCopyHTML}
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* VISUAL MODE */}
      {mode === "visual" && (
        <div className="border rounded-lg overflow-hidden bg-card">
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
                "underline",
                "strikethrough",
                "|",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "alignment",
                "outdent",
                "indent",
                "|",
                "blockQuote",
                "insertTable",
                "horizontalLine",
                "|",
                "undo",
                "redo",
              ],
              heading: {
                options: [
                  { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                  { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
                  { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
                  { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
                  { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
                ],
              },
            }}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "min-height",
                  `${isFullscreen ? 400 : minHeight}px`,
                  editor.editing.view.document.getRoot()!
                );
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
          {/* HTML Editor */}
          <div className="relative">
            <textarea
              className="w-full p-4 font-mono text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
              style={{ minHeight: isFullscreen ? 400 : minHeight }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter HTML code..."
              spellCheck={false}
            />
          </div>

          {/* Preview Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div>

          {/* Visual Preview */}
          {showPreview && value && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b">
                <p className="text-xs font-medium text-muted-foreground">Live Preview</p>
              </div>
              <div
                className="p-4 bg-card prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </div>
          )}
        </div>
      )}

      {/* Footer Stats */}
      {showWordCount && (
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex gap-4">
            <span>{stats.words} words</span>
            <span>{stats.characters} characters</span>
          </div>
          <span className="text-xs">
            Mode: <span className="font-medium capitalize">{mode}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
