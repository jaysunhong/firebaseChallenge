var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.get("/player1", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/player1.html"));
  });

  app.get("/player2", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/player2.html"));
  });

};
