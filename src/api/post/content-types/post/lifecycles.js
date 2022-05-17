const axios = require("axios");

module.exports = {
  async afterUpdate({ result }) {
    if (result.publishedAt) {
      try {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.STRAPI_PREVIEW_PUBLISHED_URL
            : "http://localhost:3000";

        await axios.get(`${baseUrl}/api/revalidate/blog/${result.slug}`, {
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
