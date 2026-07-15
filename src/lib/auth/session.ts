import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function requireSession() {
  const { isAuthenticated, getUser, getAccessTokenRaw } =
    getKindeServerSession();
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return null;
  }
  const user = await getUser();
  const accessToken = await getAccessTokenRaw();
  return { user, accessToken };
}

export async function getAccessToken() {
  const { getAccessTokenRaw, isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return null;
  }
  return getAccessTokenRaw();
}
