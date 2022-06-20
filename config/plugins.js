module.exports = ({ env }) => ({
  // seo: {
  //   enabled: true,
  // },
  slugify: {
    enabled: false, // Pausing until this is resolved: https://github.com/ComfortablyCoding/strapi-plugin-slugify/issues/58
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
          draft: {
            query: {
              type: "event",
            },
          },
        },
        {
          uid: "api::post.post",
          targetField: "slug",
          published: {
            basePath: "blog",
          },
          draft: {
            query: {
              type: "blog",
            },
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
