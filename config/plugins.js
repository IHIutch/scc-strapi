module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        post: {
          field: "slug",
          references: "title",
        },
        event: {
          field: "slug",
          references: "title",
        },
      },
      slugifyOptions: {
        lower: true,
        strict: true,
      },
      slugifyWithCount: true,
    },
  },
  seo: {
    enabled: true,
  },
  sitemap: {
    enabled: true,
    config: {
      autoGenerate: true,
      allowedFields: ["id", "string"],
    },
  },
  upload: {
    config: {
      provider: "strapi-provider-upload-supabase",
      providerOptions: {
        apiUrl: env("SUPABASE_API_URL"),
        apiKey: env("SUPABASE_API_KEY"),
        bucket: env("SUPABASE_BUCKET"),
        directory: env("SUPABASE_DIRECTORY", "uploads"),
        options: {},
      },
    },
  },
});
