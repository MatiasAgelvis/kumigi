// import postmark from "postmark";
import { ServerClient } from "postmark";

const mailClient = new ServerClient(process.env.POSTMARK!);
export default mailClient;
