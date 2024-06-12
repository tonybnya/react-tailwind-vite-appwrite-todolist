import { Client, Databases } from "appwrite";

const client = new Client();
const DB_ID = "6669d38b003569881123";
const COLLECTION_ID = "6669d3bd000b9f106307";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6669d1db00086ecaaffa");

export const databases = new Databases();
export { DB_ID, COLLECTION_ID };
