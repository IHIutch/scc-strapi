module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::security", // This might be a temporary solution https://github.com/strapi/strapi/issues/11637#issuecomment-977244572
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
          "img-src": [
            "'self'",
            "data:",
            "strapi.io",
            `${env("SUPABASE_API_URL")}`,
          ],
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::favicon",
  "strapi::public",
];
