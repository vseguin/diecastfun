/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    STORAGE_URL: process.env.STORAGE_URL
  },
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    loader: 'custom',
    loaderFile: './utils/images/loader.ts',
  },
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/styles": {
      transform: "@mui/styles/{{member}}",
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}",
    },
  },
}
