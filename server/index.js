import mongoose from "mongoose";
import { DB_URI, REST_PORT, RTC_PORT } from "./constants.js";
import { app } from "./rest.js";
import rtc from "./rtc.js";

await mongoose.connect(DB_URI);


console.log(`REST on http://0.0.0.0:${REST_PORT}/`);
console.log(`RTC on http://0.0.0.0:${RTC_PORT}/`);
app.listen(REST_PORT);
