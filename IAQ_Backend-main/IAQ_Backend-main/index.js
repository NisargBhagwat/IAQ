require("dotenv").config();
const express = require("express");
const { errorMiddleware } = require("./middleware/error.middleware");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const connectDatabase = require("./config/database");

// uses bodyParser to parse req
app.use(
  express.json({
    limit: "50mb",
  })
);
// Parses the text as URL encoded data, extended extends UTF chars
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors());
app.use("/api", routes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on 3000");
  connectDatabase();
});
