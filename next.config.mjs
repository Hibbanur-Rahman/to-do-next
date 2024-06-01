/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"export",
    basePath:'/to-do-next',
    assetPrefix: '/to-do-next/',
    images:{
        unoptimized:true,
    }
};

export default nextConfig;
