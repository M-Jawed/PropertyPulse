import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect to home or your login page if not authenticated
  },
});

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved"],
};
