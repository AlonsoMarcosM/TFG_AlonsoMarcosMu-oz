module.exports = {
  "/api": {
    target: "http://localhost:7617", // Valor por defecto
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    router: function (req) {
      // Imprime todos los headers para depuración
      console.log('Proxy - headers recibidos:', req.headers);
      const port = req.headers['x-api-port'];
      console.log('Proxy - header x-api-port:', port);
      if (port) {
        return `http://localhost:${port}`;
      }
      return "http://localhost:7617";
    },
    pathRewrite: {
      "^/api": ""
    }
  }
};
