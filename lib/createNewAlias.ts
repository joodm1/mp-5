"use server";
import getCollection, { URLS_COLLECTION } from "@/db";
import { UrlDocument } from "@/types";

export default async function createNewAlias(alias:string,url:string):Promise<UrlDocument| null> {
    //attempting
    const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/;


    if (!urlPattern.test(url))
    {
        console.log("something");//prof d
        throw new Error("invalid url, make sure it starts with http:// or https:// ");
    }
    const collection = await getCollection(URLS_COLLECTION);







    // Check if alias already exists
    const existing = await collection.findOne({ alias });
    if (existing)
    {
        throw new Error("alias is already taken");
    }

    const newAlias: UrlDocument={ alias, url };

    const res= await collection.insertOne(newAlias);

    if (!res.acknowledged)
    {
        throw new Error("can't to create alias");
    }
    return newAlias;
}