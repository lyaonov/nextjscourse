/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: '**.cloud',
            port: '',
            pathname: '/uploads/**',
        }]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack']
        })
        return config;
    }
};

export default nextConfig;
