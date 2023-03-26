import mongoose from "mongoose";
import { DB_URI, REST_PORT, RTC_PORT } from "./constants.js";
import { app } from "./rest.js";
import rtc from "./rtc.js";

await mongoose.connect(DB_URI);


console.log(`REST on http://0.0.0.0:${REST_PORT}/`);
console.log(`RTC on http://0.0.0.0:${RTC_PORT}/`);
app.listen(REST_PORT);
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

  const dbURI = 'mongodb+srv://CyberBoarBot:testpass@superbasedballdb.sdfo5br.mongodb.net/SBBE?retryWrites=true&w=majority'
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT))
  .catch((err)=> console.log(err))

  app.use(routes);
  app.use(loginRoutes);
