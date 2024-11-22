import { NextResponse } from "next/server";
import createNewAlias from "@/lib/createNewAlias";

export async function POST(req: Request) {
    try {
        const {alias, url}=await req.json();

        console.log("Received alias:", alias,"URL:",url); /// trying to debug may allah help me

        if (!alias || !url)
        {
            return NextResponse.json(
                { error: "alias and URL are required." },

            );
        }

        const x= await createNewAlias(alias, url);
        console.log("Alias creation result:", x); // debugging log

        return NextResponse.json({ alias: x.alias, url: x.url });
    } catch (error: any) { //losing hope


        console.error("error in post /api/alias:", error); // i want to die
        return NextResponse.json({error:error.message ||"internal server error"}, {status:300}
            //had to add this or else it doesn't work, apparetnly statusses up to 200 are ok so we have to specify the statts?
        );
    }
}