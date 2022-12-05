module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
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
            url: process.env.STRAPI_PREVIEW_PUBLISHED_URL + "/events/{slug}",
          },
          draft: {
            url: process.env.STRAPI_PREVIEW_DRAFT_URL,
            query: {
              type: "event",
              slug: "{slug}",
            },
          },
        },
        {
          uid: "api::post.post",
          targetField: "slug",
          published: {
            url: process.env.STRAPI_PREVIEW_PUBLISHED_URL + "/blog/{slug}",
          },
          draft: {
            url: process.env.STRAPI_PREVIEW_DRAFT_URL,
            query: {
              type: "post",
              slug: "{slug}",
            },
          },
        },
      ],
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
