module.exports = ({ env }) => {
  const previewUrl =
    (process.env.NODE_ENV === "production"
      ? process.env.STRAPI_SITE_URL
      : "http://localhost:3000") + "/api/preview";

  return {
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
            published: {
              url: process.env.STRAPI_SITE_URL + "/events/{slug}",
            },
            draft: {
              url: previewUrl,
              query: {
                type: "event",
                slug: "{slug}",
                secret: process.env.STRAPI_PREVIEW_SECRET,
              },
            },
          },
          {
            uid: "api::post.post",
            published: {
              url: process.env.STRAPI_SITE_URL + "/blog/{slug}",
            },
            draft: {
              url: previewUrl,
              query: {
                type: "post",
                slug: "{slug}",
                secret: process.env.STRAPI_PREVIEW_SECRET,
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
  };
};
