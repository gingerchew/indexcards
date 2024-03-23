import { type APIContext, type APIRoute } from "astro";
import { db, FlashCards } from "astro:db";
import { nanoid } from "nanoid";


export const POST: APIRoute = async (context: APIContext) => {
    const json = await context.request.json();
    let by:string = null;
    const config:Record<string, any> = {};

    Object.entries<string>(json).forEach((entry:[string, string]) => {
        const [name, value] = entry;
        if (name === 'by') {
            by = value;
        } else {
            config[name] = value;
        }
    })

    if (typeof by === 'string') {
        return new Response(JSON.stringify({
            message: 'User not found'
        }), {
            statusText: 'NO'
        })
    }

    await db.insert(FlashCards).values({
        id: nanoid(),
        config,
        by
    });

    return new Response(context.request.url);
}