import { chain } from "@/middlewares/chain";
import { withAuthMiddleware } from "@/middlewares/withAuthMiddleware";

export default chain([
  withAuthMiddleware,
]);

export const config = {
  matcher: [
    "/newblog/:path*",
    "/profile/:path*",
  ],
};
