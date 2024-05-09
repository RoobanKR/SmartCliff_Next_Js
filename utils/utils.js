export const getAPIURL = () => {
  return process.env.NODE_ENV === "production"
    ? "http://localhost:5353"
    : "https://smartcliff-server.onrender.com";
};
