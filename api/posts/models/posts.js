"use strict";

const slugify = require("slugify");
slugify.extend({ "|": "" });

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (data.title) {
        data.slug = slugify(data.title, {
          lower: true,
          strict: true,
        });
      }
      return;
    },
    async beforeUpdate(params, data) {
      if (data.title) {
        data.slug = slugify(data.title, {
          lower: true,
          strict: true,
        });
      }
      return;
    },
  },
};
