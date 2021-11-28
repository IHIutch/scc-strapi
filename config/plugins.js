module.exports = ({ env }) => ({
  upload: {
    provider: "supabase",
    providerOptions: {
      apiUrl: env("SUPABASE_API_URL"),
      apiKey: env("SUPABASE_API_KEY"),
      bucket: env("SUPABASE_BUCKET"),
      directory: env("SUPABASE_DIRECTORY", "uploads"),
      options: {},
    },
  },
});
