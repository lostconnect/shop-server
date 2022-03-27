module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_LIFETIME: 30 * 60, // 30 minutes
  JWT_REFRESH_LIFETIME: 10 * 24 * 60 * 60, // 10 days
  COOKIE_ACCESS_LIFETIME: 30 * 60 * 1000, // 30 minutes
  COOKIE_REFRESH_LIFETIME: 10 * 24 * 60 * 60 * 1000, // 10 days
}
