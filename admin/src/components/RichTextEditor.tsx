import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";

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

  // const config = useMemo(
  //   () => ({
  //     readonly: false,
  //     placeholder: placeholder || "Start typing your content...",
  //     height: 400,
  //     tabIndex: 1,

  //     /* ================= TOOLBAR ================= */
  //     buttons: [
  //       "source",
  //       "|",
  //       "bold",
  //       "italic",
  //       "underline",
  //       "strikethrough",
  //       "superscript",
  //       "subscript",
  //       "|",
  //       "font",
  //       "fontsize",
  //       "lineHeight",
  //       "paragraph",
  //       "|",
  //       "brush",
  //       "eraser",
  //       "|",
  //       "ul",
  //       "ol",
  //       "outdent",
  //       "indent",
  //       "|",
  //       "align",
  //       "|",
  //       "image",
  //       "video",
  //       "file",
  //       "link",
  //       "table",
  //       "|",
  //       "blockquote",
  //       "hr",
  //       "code",
  //       "|",
  //       "undo",
  //       "redo",
  //       "|",
  //       "preview",
  //       "fullsize",
  //     ],

  //     buttonsMD: [
  //       "bold",
  //       "italic",
  //       "underline",
  //       "|",
  //       "ul",
  //       "ol",
  //       "|",
  //       "image",
  //       "link",
  //       "|",
  //       "undo",
  //       "redo",
  //     ],

  //     buttonsSM: ["bold", "italic", "|", "image", "link"],

  //     /* ================= IMAGE UPLOADER ================= */
  //     uploader: {
  //       url: "http://127.0.0.1:5001/api/upload/editor-image",
  //       method: "POST",
  //       format: "json",

  //       // IMPORTANT: must be STRING, not function
  //       filesVariableName: () => "image",

  //       withCredentials: false,
  //       headers: {},

  //       isSuccess: (resp: { success?: boolean }) => resp?.success === true,

  //       process: (resp: { url?: string }) => ({
  //         files: resp?.url ? [resp.url] : [],
  //         path: "",
  //         baseurl: "",
  //         error: resp?.url ? 0 : 1,
  //         message: resp?.url ? "Uploaded successfully" : "Upload failed",
  //       }),

  //       defaultHandlerSuccess: function (data: { files?: string[] }) {
  //         if (data.files?.length) {
  //           data.files.forEach((url) => {
  //             // Insert image into editor
  //             this.s.insertImage(url, null, 300);
  //           });
  //         }
  //       },

  //       defaultHandlerError: function (e: Error) {
  //         this.e.fire("errorMessage", e.message || "Image upload failed");
  //       },
  //     },

  //     /* ================= FILE BROWSER ================= */
  //     filebrowser: {
  //       ajax: {
  //         url: "http://127.0.0.1:5001/api/upload/editor-image",
  //       },
  //     },

  //     /* ================= IMAGE EDITOR ================= */
  //     image: {
  //       openOnDblClick: true,
  //       useImageEditor: true,
  //       editSrc: true,
  //       editTitle: true,
  //       editAlt: true,
  //       editLink: true,
  //       editSize: true,
  //       editMargins: true,
  //       editClass: true,
  //       availableClasses: [
  //         "img-fluid",
  //         "img-thumbnail",
  //         "rounded",
  //         "shadow",
  //       ],
  //       editStyle: true,
  //       editId: true,
  //       editAlign: true,
  //       showPreview: true,
  //       selectImageAfterClose: true,
  //     },

  //     /* ================= PARAGRAPH / HEADINGS ================= */
  //     controls: {
  //       paragraph: {
  //         list: {
  //           p: "Paragraph",
  //           h1: "Heading 1",
  //           h2: "Heading 2",
  //           h3: "Heading 3",
  //           h4: "Heading 4",
  //           h5: "Heading 5",
  //           h6: "Heading 6",
  //           blockquote: "Quote",
  //           pre: "Code",
  //         },
  //       },
  //     },

  //     /* ================= PASTE CLEANUP ================= */
  //     askBeforePasteHTML: false,
  //     askBeforePasteFromWord: false,
  //     defaultActionOnPaste: "insert_clear_html",

  //     /* ================= CLEAN HTML ================= */
  //     cleanHTML: {
  //       removeEmptyElements: true,
  //       fillEmptyParagraph: false,
  //     },

  //     /* ================= COUNTERS ================= */
  //     showCharsCounter: true,
  //     showWordsCounter: true,
  //     showXPathInStatusbar: false,

  //     /* ================= UX ================= */
  //     toolbarAdaptive: true,
  //     toolbarSticky: true,
  //   }),
  //   [placeholder]
  // );

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
        "about",
      ],

      uploader: {
        url: "http://127.0.0.1:5001/api/upload/editor-image",
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
    <div className="rich-text-editor">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
        onChange={() => { }}
      />
    </div>
  );
};

export default RichTextEditor;
