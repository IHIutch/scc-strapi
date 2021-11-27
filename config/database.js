const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);
module.exports = () => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: config.host || "localhost",
        port: config.port || 5432,
        database: config.database || "strapi",
        username: config.user || "strapi",
        password: config.password || "strapi",
        ssl: {
          rejectUnauthorized: false,
        },
      },
      options: {},
    },
  },
});
