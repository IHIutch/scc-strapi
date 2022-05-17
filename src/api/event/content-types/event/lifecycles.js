const axios = require("axios");
const slugify = require("slugify");

module.exports = {
  async beforeCreate({ params: { data } }) {
    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
      });
    }
  },
  async beforeUpdate({ params: { data } }) {
    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
      });
    }
  },
  async afterUpdate({ result }) {
    if (result.publishedAt) {
      try {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.STRAPI_PREVIEW_PUBLISHED_URL
            : "http://localhost:3000";

        await axios.get(`${baseUrl}/api/revalidate/events/${result.slug}`, {
          params: {
            secret: process.env.STRAPI_PREVIEW_SECRET,
          },
        });
      } catch (error) {
        console.error(`Revalidation error: ${error.message}`);
      }
    }
  },
};
