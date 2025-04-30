/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  output: "export",
  images: { unoptimized: true },
  productionBrowserSourceMaps: true,
  experimental: {
    forceSwcTransforms: true,
  },
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.module.rules.push({
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules\/(?!@babylonlabs-io)/,
      });
    }

    return config;
  },
};

export default nextConfig;
