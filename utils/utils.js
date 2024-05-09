export const getAPIURL = () => {
  return process.env.NODE_ENV === "production"
    ? "https://smartcliff-server-1.onrender.com"
    : "http://localhost:5353";
};
