export function getPublicApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/v1";
}
