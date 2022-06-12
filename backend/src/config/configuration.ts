export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 4000,
  database: {
    MONGO_LOGIN: process.env.MONGO_LOGIN,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  },
});
