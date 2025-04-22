const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const multer = require("multer");
const upload = multer();

const app = express();
app.engine("hbs", hbs());
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", (req, res) => {
	res.render("forbidden");
});

app.post("/contact/send-message", upload.single("design"), (req, res) => {
	const { author, sender, title, message } = req.body;
	const file = req.file;

	if (author && sender && title && message && file) {
		res.render("contact", {
			isSent: true,
			fileName: file.originalname,
		});
	} else {
		res.render("contact", { isError: true });
	}
});

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/hello/:name", (req, res) => {
	res.render("hello", { name: req.params.name });
});

app.get("/contact/send-message", (req, res) => {
	res.render("contact.hbs");
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
