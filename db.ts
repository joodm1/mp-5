import {MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI)
{
    throw new Error("mongo var is undefined");
}

const DB_NAME="mp5db";

export const URLS_COLLECTION="urls-collection";

let client: MongoClient | null= null;
let db:Db | null=null;

async function connect(): Promise<Db> {


    if (!client)
    {
        client= new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(urlLink:string): Promise<Collection>
{
    if(!db)
    {
        db=await connect();



    }

    return db.collection(urlLink);
}






