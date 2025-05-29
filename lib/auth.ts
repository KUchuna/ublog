import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

dotenv.config({ path: '.env.development.local' });


// export const auth = betterAuth({
//     database: new Pool({
//     connectionString: process.env.DATABASE_URL,
//   }),
//     emailAndPassword: {  
//         enabled: true,
//         autoSignIn: true
//     }, 
// });

export const auth = betterAuth({
    database: new Pool({
    connectionString: process.env.POSTGRES_URL,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  }),
    emailAndPassword: {  
        enabled: true,
        autoSignIn: true
    }, 
});