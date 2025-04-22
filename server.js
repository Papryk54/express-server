const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");

const app = express();
app.engine("hbs", hbs());
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));

app.use("/user", (req, res) => {
	res.render("forbidden");
});

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/hello/:name", (req, res) => {
	res.render("hello", { name: req.params.name });
});

app.get("/about", (req, res) => {
	res.render("about.hbs", { layout: "dark" });
});

app.get("/user/panel", (req, res) => {
	res.render("panel");
});

app.get("user/settings", (req, res) => {
	res.render("settings");
});

app.use((req, res) => {
	res.status(404).send("404 not found...");
});

app.listen(8000, () => {
	console.log("Server is running on port: 8000");
});
