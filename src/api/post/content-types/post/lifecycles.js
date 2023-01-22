const slugify = require("slugify");

const handleSlugify = (value) => {
  slugify.extend({ "|": "" }); // Remove all instances of '|'
  return slugify(value, {
    lower: true,
    strict: true,
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
