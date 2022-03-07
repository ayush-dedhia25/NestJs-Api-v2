module.exports = {
   "type": process.env.DB_TYPE,
   "database": process.env.DB_NAME,
   "entities": ["dist/**/*.entity.js"],
   "synchronize": true,
}