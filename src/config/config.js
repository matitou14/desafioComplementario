import dotenv from 'dotenv';
// import MongoDAO from '../dao/models/DAO/MongoDAO.js';
dotenv.config();

const config = {  
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://matitouthe14:Alejo.2510@cluster0.rexogvr.mongodb.net/ecommerce?retryWrites=true&w=majority",
  ADMIN_MAIL: process.env.ADMIN_MAIL,
  ADMIN_PASS: process.env.ADMIN_PASS ,
};

// const mongoDAO = new MongoDAO(config)

export default config;