module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "1238a585ed5aacae3391570058d57a9f"),
  },
});
