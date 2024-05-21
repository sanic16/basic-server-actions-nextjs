import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function HomePage() {
  const snippets = await prisma.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => (
    <div
      key={snippet.id}
      className="bg-slate-200 text-black px-2 flex justify-between py-1"
    >
      <h2>{snippet.title}</h2>
      <Link
        href={`/snippets/${snippet.id}`}
        className="font-bold text-blue-950"
      >
        View Snippet
      </Link>
    </div>
  ));

  return (
    <div className="bg-slate-500 text-white py-4 px-2 rounded-md mt-8">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl m-3 ml-0">Snippets</h1>
        <Link
          href={`/snippets/new`}
          className="bg-yellow-500 px-4 py-1 rounded-md text-black font-bold transition-colors hover:bg-yellow-600"
        >
          Create a New Snippet
        </Link>
      </div>
      <div className="flex flex-col gap-4">{renderedSnippets}</div>
    </div>
  );
}
