module.exports = ({ env }) => ({
  // seo: {
  //   enabled: true,
  // },
  sitemap: {
    enabled: true,
    config: {
      autoGenerate: true,
      allowedFields: ["id", "string"],
    },
  },
  "preview-button": {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: "api::event.event",
          targetField: "slug",
          published: {
            basePath: "events",
          },
        },
        {
          uid: "api::post.post",
          targetField: "slug",
          published: {
            basePath: "blog",
          },
        },
      ],
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
