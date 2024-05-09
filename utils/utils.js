export const getAPIURL = () => {
  return process.env.NODE_ENV === "production"
    ? "https://app.claritynotes.io"
    : "https://smartcliff-server.onrender.com";
};
