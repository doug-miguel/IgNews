import { Client } from "faunadb";

const FAUNADB_KEY: any = process.env.FAUNADB_KEY;

export const fauna = new Client({
  secret: FAUNADB_KEY,
});