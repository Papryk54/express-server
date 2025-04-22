const express = require("express");
const path = require("path");

const app = express();

app.use((req, res, next) => {
	res.show = (name) => {
		res.sendFile(path.join(__dirname, `/views/${name}`));
	};
	next();
});

app.use(express.static(path.join(__dirname, "/public")));

app.use("/user", (req, res) => {
	res.show("forbidden.html");
});

app.get("/", (req, res) => {
	res.show("home.html");
});

app.get("/about", (req, res) => {
	res.show("about.html");
});

app.get("/user/panel", (req, res) => {
	res.show("panel.html");
});

app.get("/user/settings", (req, res) => {
	res.show("settings.html");
});

app.get("/img", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "notFound.jpg"));
});

app.use((req, res) => {
	res.status(404).show("notFound.html");
});

app.listen(8000, () => {
	console.log("Server is running on port: 8000");
});
