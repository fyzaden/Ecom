import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true, // Tüm TypeScript hatalarını görmezden gel
  },
  eslint: {
    ignoreDuringBuilds: true, // Tüm Lint uyarılarını görmezden gel
  },
  // Hatalı sayfaların build'i durdurmasını engellemek için
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
