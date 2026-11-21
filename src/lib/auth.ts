// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { jwt } from "better-auth/plugins";


// const client = new MongoClient(process.env.MONGODB_URI as string);
// const db = client.db('Assignment-9ph');
// export const auth = betterAuth({
//   emailAndPassword: { 
//     enabled: true, 
//   }, 
//   user: {
//     additionalFields: {
//       role: {
//         type: ["customer", "technician", "admin"],
//         required: false,
//         defaultValue: "customer",
//       },
//       phone: {
//         type: "string",
//         required: false,
//       },
//       area: {
//         type: "string",
//         required: false,
//       },
//       bio: {
//         type: "string",
//         required: false,
//       },
//     },
//   },
//   database: mongodbAdapter(db, {
//     client,
//   }),
//   plugins:[jwt({sessionCookieCache: true,}),
    
//   ],
//   session:{
//     cookieCache:{
//       enabled:true,
//       strategy:'jwt',
//       maxAge: 7 * 24 * 60 * 60
//     },
//   },

// });

//after adding mongo.ts file for the problem 

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { client, db } from "@/lib/mongodb";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["customer", "technician", "admin"],
        required: false,
        defaultValue: "customer",
      },
      phone: {
        type: "string",
        required: false,
      },
      area: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
    },
  },
  //gemini suggest before 
  // database: mongodbAdapter(db, {
  //   client,
  // }),
  database: mongodbAdapter(db),


  plugins: [
    jwt({
      sessionCookieCache: true,
    }),
  ],

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});
