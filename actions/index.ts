'use server'

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function editSnippetAction(id: number, code: string){
    await db.snippet.update({
        where: {
            id
        },
        data: {
            code
        }
    })

    redirect(`/snippets/${id}`)
    revalidatePath('/')
}

export async function createSnippet(formState: {message: string}, formData: FormData) {
    
    // Check the user's inputs and make sure thye're valid
    const title = formData.get("title");
    const code = formData.get("code");

    if(typeof title !== "string" || title.trim().length < 3){
        return {
            message: 'Title must be longer'
        }
    }

    if(typeof code !== 'string' || code.trim().length < 10 ){
        return {
            'message': 'Code must be longer than 10 characters'
        }
    }

    try {
        // Create a new snippet in the database
    const snippet = await db.snippet.create({
        data: {
          title,
          code,
        },
      });

    } catch (error: unknown) {
        if(error instanceof Error){
            return {
                message: error.message
            }
        }else{
            return {
                message: 'An unknown error occurred'
            }
        }
    }

    // Redirect the user to the root route
    revalidatePath("/");
    redirect("/");
    
  }