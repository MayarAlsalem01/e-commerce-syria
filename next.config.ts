import { baseUrl } from "@/lib/httpClient";
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://tech-commerce.fractalsgroup.net/**')]
  }
};




const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);