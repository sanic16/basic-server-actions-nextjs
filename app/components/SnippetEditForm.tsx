"use client";
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { editSnippetAction } from "@/actions";

const SnippetEditForm = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState<string>(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetActionFunction = editSnippetAction.bind(
    null,
    snippet.id,
    code
  );

  return (
    <form action={editSnippetActionFunction}>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{
          minimap: { enabled: false },
        }}
        onChange={handleEditorChange}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 rounded-sm py-1 inline-block mt-4"
      >
        Update
      </button>
    </form>
  );
};

export default SnippetEditForm;
