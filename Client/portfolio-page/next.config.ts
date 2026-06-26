// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* This completely silences the HMR warning on dev server ports */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;