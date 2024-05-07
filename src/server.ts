import { configDotenv } from "dotenv";
import app from "./app";

configDotenv();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
}); 