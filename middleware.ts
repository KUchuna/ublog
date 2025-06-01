import { chain } from "@/middlewares/chain";
import { withAuthMiddleware } from "@/middlewares/withAuthMiddleware";
import { withApiMiddleware } from "@/middlewares/withApiMiddleware";

export default chain([
	withApiMiddleware,
  	withAuthMiddleware,
]);

export const config = {
  matcher: [
    "/api/:path((?!auth).*)",
    "/newblog/:path*",
    "/profile/:path*",
  ],
};
