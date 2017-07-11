require('dotenv').config();

module.exports = {
  secret: process.env.AUTH_SECRET,
  database: process.env.DATABASE,
  port: process.env.PORT
}