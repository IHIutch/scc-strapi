const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);

module.exports = () => {
  return {
    connection: {
      client: "postgres",
      connection: {
        host: config.host || "localhost",
        port: config.port || 5432,
        database: config.database || "strapi",
        user: config.user || "strapi",
        password: config.password || "strapi",
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
  };
};
