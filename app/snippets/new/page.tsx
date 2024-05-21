"use client";

import BackButton from "@/app/components/BackButton";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

export default function SnippetCreatePage() {
  const [formState, formAction] = useFormState(actions.createSnippet, {
    message: "",
  });
  return (
    <div className="min-h-screen p-4">
      <BackButton />

      <form action={formAction} className="mt-5 w-1/2 mx-auto">
        <h3 className="font-bold my-3 text-2xl text-yellow-950">
          Create a Snippet
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            {formState.message && (
              <div className="bg-red-400 border border-red-800 rounded-sm p-1 text-white">
                {formState.message}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <label htmlFor="title" className="w-12">
              Title
            </label>
            <input
              name="title"
              className="border rounded p-2 w-full outline-none bg-blue-800/25"
              id="title"
            />
          </div>

          <div className="flex gap-4 items-center">
            <label htmlFor="code" className="w-12">
              Code
            </label>
            <textarea
              name="code"
              className="border rounded p-2 w-full outline-none bg-blue-800/25"
              id="code"
            ></textarea>
          </div>

          <button
            type="submit"
            className="border rounded p-2 bg-blug-200 bg-blue-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
