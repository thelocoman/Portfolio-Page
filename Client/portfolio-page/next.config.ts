// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',          // <-- Enforces the creation of the 'out/' folder
  images: {
    unoptimized: true,       // <-- Prevents build failures if using <Image /> components
  },
  /* This completely silences the HMR warning on dev server ports */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;