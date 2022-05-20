module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: [
            "API_KEY",
            "AUTH_DOMAIN",
            "PROJECT_ID",
            "STORAGE_BUCKET",
            "MESSAGING_SENDER_ID",
            "APP_ID",
            "DATABASE_URL",
            "OCR_API_KEY",
            "EXCHANGE_API_KEY",
          ],
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
