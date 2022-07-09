var express = require("express");
var cors = require("cors");
var path = require("path");
var http = require("http");

var app = express();
var server = http.createServer(app);
const port = 3000;
app.set("port", port);

app.use(cors({ origin: "*" }));
app.set("views",  "./src/views");
app.set("view engine", "ejs");
app.use(express.static("./src/public"));

const index = require("./src/routes/index");
app.use("/", index);

app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

server.listen(port, () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log(`Listening at ${bind}`);
    console.log(path.join(__dirname, "src/public"));
})
  