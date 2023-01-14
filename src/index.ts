import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { server } from './server';

dotenv.config();


const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});