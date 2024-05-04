import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
// const schema = a.schema({
//   Todo: a
//     .model({
//       content: a.string(),
//     })
//     .authorization([a.allow.owner(), a.allow.public().to(['read'])]),
// });

const schema = a.schema({
  Manga: a
    .model({
      title: a.string().required(),
      abstract: a.string(),
      image: a.url(),
      url: a.url().required(),
      source: a.string().required(),
      isFinished: a.boolean(),
      genres: a.string().array(),
      vote: a.float(),
      chapters: a.hasMany('Chapter', 'mangaId'),
      chaptersCount: a.integer().required(),
      packs: a.hasMany('MangaPack', 'mangaId'),
    })
    .authorization(allow => [allow.publicApiKey()]),

  Chapter: a
    .model({
      title: a.string().required(),
      index: a.integer().required(),
      url: a.url().required(),
      releasedAt: a.datetime().required(),
      mangaId: a.id(),
      manga: a.belongsTo('Manga', 'mangaId'),
    })
    .authorization(allow => [allow.publicApiKey()]),

  Pack: a
    .model({
      name: a.string().required(),
      mangas: a.hasMany('MangaPack', 'packId'),
    })
    .authorization(allow => [allow.owner(), allow.publicApiKey().to(['read'])]),

  MangaPack: a
    .model({
      mangaId: a.id().required(),
      packId: a.id().required(),
      manga: a.belongsTo('Manga', 'mangaId'),
      pack: a.belongsTo('Pack', 'packId'),
    })
    .authorization(allow => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
