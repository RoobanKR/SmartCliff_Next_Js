export const getAPIURL = () => {
  return process.env.NODE_ENV === "production"
    ? "https://smartcliff-server.onrender.com"
    : "https://smartcliff-server.onrender.com" || "http://localhost:5353";
};
