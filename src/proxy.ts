import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  async function proxy() {
    // Auth handled by withAuth; req.kindeAuth available if needed.
  },
  {
    publicPaths: ["/", "/api/auth"],
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/scans/:path*",
    "/history/:path*",
    "/rank-trackers/:path*",
    "/account/:path*",
    "/onboarding/:path*",
    "/admin/:path*",
  ],
};
