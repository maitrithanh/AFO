/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_API_ENPOINT: process.env.NEXT_PUBLIC_API_ENPOINT },
  reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname: 'img.freepik.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'logoipsum.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'www.8newsnow.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'jzeno.io.vn',
                pathname: '**'
            },
            {
              protocol: 'https',
              hostname: 'localhost',
              pathname: '**'
            },
        ]
    },
    async headers() {
        return [
          {
            // matching all API routes
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          }
        ]
      }
}

module.exports = nextConfig
