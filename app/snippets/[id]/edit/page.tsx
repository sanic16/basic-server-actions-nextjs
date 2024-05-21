import BackButton from "@/app/components/BackButton";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SnippetEditForm from "@/app/components/SnippetEditForm";

import React from "react";

export default async function EditSnippetPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  if (isNaN(parseInt(params.id))) {
    throw new Error("Invalid ID");
  }

  const snippet = await prisma.snippet.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!snippet) {
    throw new Error("Snippet not found");
  }

  //   const updateSnippet = async (formData: FormData) => {
  //     "use server";
  //     const title = formData.get("title") as string;
  //     const code = formData.get("code") as string;

  //     const updateSnippet = await db.snippet.update({
  //       where: {
  //         id: snippet.id,
  //       },
  //       data: {
  //         title,
  //         code,
  //       },
  //     });

  //     console.log(updateSnippet);

  //     revalidatePath("/", "layout");
  //     redirect("/");
  //   };

  return (
    <div className="min-h-screen p-4">
      <BackButton />
      {/* <div>
        <form action={updateSnippet}>
          <div className="mt-4 flex justify-between items-center bg-slate-950 py-1 px-2">
            <input
              className="text-slate-200 font-bold bg-transparent outline-none w-full"
              value={snippet.title}
              name="title"
            />
          </div>
          <pre className="bg-slate-800 py-4 px-2 text-slate-200">
            <textarea
              name="code"
              className="w-full resize-none min-h-40 bg-transparent border-none outline-none"
            >
              {snippet.code}
            </textarea>
          </pre>
          <div className="mt-4">
            <button type="submit" className="bg-green-600 py-1 px-2 rounded-sm">
              Update
            </button>
          </div>
        </form>
      </div> */}
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}

export async function generateStaticParams() {
  const updateSnippets = await prisma.snippet.findMany();

  return updateSnippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
