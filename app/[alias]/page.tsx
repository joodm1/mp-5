import { redirect } from "next/navigation";
import getCollection, { URLS_COLLECTION } from "@/db";

interface props {
    params: { alias: string };
}

export default async function AliasPage({ params }: props) {
    const { alias } = params;

    // Fetch the database collection
    const collection = await getCollection(URLS_COLLECTION);

    // Find the entry associated with the alias
    const entry = await collection.findOne({ alias });

    if (entry) {
        // redirecting immediately to the URL slayage
        redirect(entry.url);
    }




    else {
        // If alias is not found, sened an error page
        return (
            <div className="flex flex-col items-center mt-20">
                <h1 className="text-3xl font-bold">404 - Alias Not Found</h1>
                <p>The alias you provided does not exist.</p>
            </div>
        );
    }
}