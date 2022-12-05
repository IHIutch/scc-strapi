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
            basePath: "events",
          },
          draft: {
            query: {
              postTypePath: "events",
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
              postTypePath: "blog",
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
