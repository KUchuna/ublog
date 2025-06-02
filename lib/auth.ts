import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import localDb from "./dblocal";
import { nextCookies } from "better-auth/next-js";

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
    database: localDb as Pool,
    emailAndPassword: {  
        enabled: true,
        autoSignIn: true
    },
    plugins: [nextCookies()]
});