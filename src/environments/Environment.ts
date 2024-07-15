const Environment = {
  env: import.meta.env.VITE_ENV,
  apiUrl: import.meta.env.VITE_API_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
};

export default Environment;
