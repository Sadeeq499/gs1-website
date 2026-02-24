module.exports = {
  apps: [
    {
      name: "gs1-website-new",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 1910",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};