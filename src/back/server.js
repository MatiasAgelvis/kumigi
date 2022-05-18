import express from "express";
import compression from "compression";
import helmet from "helmet";
import getPort, {portNumbers} from 'get-port';
import Avatara from "../lib/avatara.js";
import 'dotenv/config'

import v1 from "./v1.js";
import v2 from "./v2.js";

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

const envPort = parseInt(process.env.PORT)
const port = await getPort({port: portNumbers(envPort, envPort + 100)})

app.listen(port, () => {
    console.log("\n\n");
    console.log("───────────────────────────");
    console.log(" ┌───────────────────────┐ ");
    console.log(" │---------START---------│ ");
    console.log(` │------ PORT ${port} ------│ `);
    console.log(" └───────────────────────┘ ");
    console.log("───────────────────────────");
    console.log("\n");
});
