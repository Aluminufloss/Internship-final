/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => ([
    {
      source: '/wow/:cart/:test',
      destination: '/catalog?name=:cart&id=test'
    }
  ]),
  compiler: {
    styledComponents: true
  },
  // images: {
  //   path: "/images",
  // },
}

module.exports = nextConfig
