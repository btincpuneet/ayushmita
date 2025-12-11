import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillWithHtmlToggle = ({ value, onChange }) => {
  const [mode, setMode] = useState("editor");

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-3 py-1 border rounded ${mode === "editor" ? "bg-gray-200" : ""}`}
          onClick={() => setMode("editor")}
        >
          Editor
        </button>

        <button
          className={`px-3 py-1 border rounded ${mode === "html" ? "bg-gray-200" : ""}`}
          onClick={() => setMode("html")}
        >
          HTML
        </button>
      </div>

      {mode === "editor" && (
        <ReactQuill value={value} onChange={onChange} />
      )}

      {mode === "html" && (
        <textarea
          className="w-full border p-2 rounded min-h-[200px]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default QuillWithHtmlToggle;
