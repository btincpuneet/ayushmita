import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";
import { API_BASE } from "../config/api";

const API_URL = `${API_BASE}/api/upload/editor-image`;


interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

interface JoditInstance {
  s: {
    insertImage: (url: string, styles: unknown, width: number) => void;
  };
  e: {
    fire: (event: string, message: string) => void;
  };
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      placeholder: "Start typing...",

      toolbarAdaptive: false,
      toolbarSticky: false,
      toolbarButtonSize: "middle",

      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "eraser",
        "brush",
        "|",
        "superscript",
        "subscript",
        "|",
        "font",
        "fontsize",
        "lineHeight",
        "paragraph",
        "|",
        "ul",
        "ol",
        "indent",
        "outdent",
        "|",
        "align",
        "|",
        "image",
        "file",
        "video",
        "link",
        "table",
        "symbols",
        "|",
        "blockquote",
        "hr",
        "code",
        "|",
        "cut",
        "copy",
        "paste",
        "selectall",
        "|",
        "undo",
        "redo",
        "find",
        "|",
        "preview",
        "print",
        "fullsize",
        "|",

      ],

      uploader: {
        url: API_URL,
        method: "POST",
        format: "json",
        filesVariableName: () => "image",

        isSuccess: (resp: any) => resp?.success === true,
        process: (resp: any) => ({
          files: resp?.url ? [resp.url] : [],
        }),

        defaultHandlerSuccess: function (data: any) {
          data.files?.forEach((url: string) => {
            this.s.insertImage(url, null, 300);
          });
        },
      },

      image: {
        editAlt: true,
        editTitle: true,
        editLink: true,
        editSize: true,
        editAlign: true,
        editClass: true,
        editStyle: true,
        useImageEditor: true,
      },

      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html",

      showWordsCounter: true,
      showCharsCounter: true,
    }),
    []
  );

  return (
    <>
     
      <style>
        {`
        .jodit-container {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          font-family: Inter, system-ui, sans-serif;
        }

        .jodit-toolbar__box {
          background: #f9fafb;
          padding: 8px;
          border-radius: 12px 12px 0 0;
        }

        .jodit-toolbar-button {
          border-radius: 8px !important;
          margin: 2px;
          transition: all 0.2s ease;
        }

        .jodit-toolbar-button:hover {
          background: #e0ebff !important;
        }

        .jodit-toolbar-button_active {
          background: #2563eb !important;
        }

        .jodit-toolbar-button_active svg {
          fill: #fff !important;
        }

        .jodit-wysiwyg {
          padding: 22px !important;
          font-size: 15px;
          line-height: 1.8;
          color: #111827;
        }

        .jodit-wysiwyg img {
          border-radius: 10px;
          margin: 20px 0;
          max-width: 100%;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .jodit-placeholder {
          color: #9ca3af !important;
          font-style: italic;
        }

        .jodit-wysiwyg h1 { font-size: 32px; font-weight: 700; }
        .jodit-wysiwyg h2 { font-size: 26px; font-weight: 600; }
        .jodit-wysiwyg h3 { font-size: 22px; font-weight: 600; }
        .jodit-wysiwyg p  { margin-bottom: 16px; }
        `}
      </style>

    <div className="rich-text-editor">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
        onChange={() => { }}
      />
    </div>
    </>
  );
};

export default RichTextEditor;
