/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["https://6000-firebase-studio-1769090339743.cluster-ikslh4rdsnbqsvu5nw3v4dqjj2.cloudworkstations.dev"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/blog/comment-choisir-agence-securite',
        destination: '/blog/choisir-agence-securite',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
