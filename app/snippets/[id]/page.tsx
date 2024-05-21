import BackButton from "@/app/components/BackButton";
import PrimaryButton from "@/app/components/PrimaryButton";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const snippetId = props.params.id;
  if (isNaN(Number(snippetId))) {
    throw new Error("Invalid snippet ID, must be an integer");
  }
  const snippet = await prisma.snippet.findUnique({
    where: {
      id: Number(snippetId),
    },
  });

  if (!snippet) {
    // throw new Error("Snippet not found");
    notFound();
  }

  const deleteSnippetAction = async () => {
    "use server";
    await prisma.snippet.delete({
      where: {
        id: snippet.id,
      },
    });
    revalidatePath("/");
    revalidatePath(`/snippets/${snippet.id}`);
    redirect("/");
  };

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return (
    <div className="min-h-screen p-4">
      <BackButton />
      <div>
        <div className="mt-4 flex justify-between items-center bg-slate-950 py-1 px-2">
          <h1 className="text-slate-200 font-bold">{snippet.title}</h1>
          <form className="flex gap-4">
            <PrimaryButton href={`${snippet.id}/edit`} className="bg-green-600">
              Edit
            </PrimaryButton>
            <button
              className="bg-red-600 text-white px-2 rounded-sm py-1"
              formAction={deleteSnippetAction}
            >
              Delete
            </button>
          </form>
        </div>
        <pre className="bg-slate-800 py-4 px-2 text-slate-200">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await prisma.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
