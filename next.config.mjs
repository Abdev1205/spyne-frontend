/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost', "res.cloudinary.com"]
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    disableWorker: true,
  },
};

export default nextConfig;