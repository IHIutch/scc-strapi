const slugify = require("slugify");

const handleSlugify = (value) => {
  slugify(value, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@|]/g,
  });
};

module.exports = {
  async beforeCreate({ params: { data } }) {
    if (data.title) {
      data.slug = handleSlugify(data.title);
    }
  },
  async beforeUpdate({ params: { data } }) {
    if (data.title) {
      data.slug = handleSlugify(data.title);
    }
  },
};
