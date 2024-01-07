/** @type {import('next').NextConfig} */
const nextConfig = {
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
            }
        ]
    }
}

module.exports = nextConfig
