const config = {
  server_base_url: process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000",
};
const _config = Object.freeze(config);
export default _config;
