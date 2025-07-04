export const getAPIURL = () => {
  return process.env.NODE_ENV === "production"
    ? "https://smartcliff-server-5qpp.onrender.com"
    : "http://localhost:5353";
};




// export const getAPIURL = () => {
//   return process.env.NEXT_PUBLIC_API_URL;
// };

// // utils/config.js - Create this file to centralize your configuration


// // Centralized config with fallbacks
// const config = {
//   apiUrl: process.env.NEXT_PUBLIC_API_URL,
//   appName: process.env.NEXT_PUBLIC_APP_NAME
// };

// // Debug in development
// if (process.env.NODE_ENV === 'development') {
//   console.log('App configuration:', config);
// }

// export default config;