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
    if (data.title && !data.slug) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
      });
    }
  },
};
