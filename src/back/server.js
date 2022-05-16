const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const Avatara = require("../lib/avatara");

const v1 = require("./v1");
const v2 = require("./v2");

const app = express();

app.use(compression());
app.use(helmet());

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/", (req, res) => {
    res.json({
        shapes: ["basic", "rectangle", "circle", "gradient", "text"],
        options: ["texts", "colors", "fonts"],
        fonts: new Avatara().fonts(),
    });
});

app.use("/v1", v1);
app.use("/v2", v2);

app.listen(process.env.PORT || 3000, () => {
    console.log("\n\n\n");
    console.log("───────────────────────────");
    console.log(" ┌───────────────────────┐ ");
    console.log(" │---------START---------│ ");
    console.log(" └───────────────────────┘ ");
    console.log("───────────────────────────");
    console.log("\n");
});
