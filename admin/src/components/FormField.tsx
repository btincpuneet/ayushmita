import React from "react";
import { AlertCircle } from "lucide-react";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          bg-background text-foreground
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          transition
          ${error ? "border-red-500 focus:ring-red-500" : "border-border"}
          ${className}
        `}
      />

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  error,
  className = "",
  rows = 3,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>

      <textarea
        {...props}
        rows={rows}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm
          bg-background text-foreground
          placeholder:text-muted-foreground
          resize-y
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          transition
          ${error ? "border-red-500 focus:ring-red-500" : "border-border"}
          ${className}
        `}
      />

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};
