import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/v1";
let apiOrigin = "http://localhost:3001";
try {
  apiOrigin = new URL(apiUrl).origin;
} catch {
  // keep default
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              `connect-src 'self' ${apiOrigin} https://*.kinde.com`,
              "frame-src 'self' https://*.kinde.com",
              "base-uri 'self'",
              "form-action 'self' https://*.kinde.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
