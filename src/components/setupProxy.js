// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware("/", {
//       target: "http://localhost:5173", // Your backend server URL or API endpoint
//       changeOrigin: true,
//       onProxyRes: function (proxyRes) {
//         proxyRes.headers["Cross-Origin-Opener-Policy"] = "same-origin-allow-popups";
//         proxyRes.headers["Cross-Origin-Embedder-Policy"] = "require-corp";
//       },
//     })
//   );
// };
