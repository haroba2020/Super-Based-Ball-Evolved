require('dotenv').config({ path: ".env" });

export const REST_PORT = process.env.REST_PORT
export const RTC_PORT = process.env.RTC_PORT
export const SIGNING_KEY = process.env.SIGNING_KEY
export const DB_URI = process.env.MONGODB_URI