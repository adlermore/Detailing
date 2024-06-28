// @type {import('next').NextConfig} 

const nextConfig = {
  reactStrictMode : false,
  images: {
    // domains: ['carwash-api.testingforproduction.com']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'carwash-api.testingforproduction.com',
        pathname: '**',
      },
    ]
  }
};

export default nextConfig;


