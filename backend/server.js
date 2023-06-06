const app = require("./app");
const PORT = process.env.PORT;

// Handling uncaught exceptions
process.on("uncaughtException", function (err) {
  console.log(`Error: ${err.message}`);
  console.log("Server shotting down for Uncaught Exception");
  // server.close(() => {
  //   process.exit(1);
  // });
});

app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
