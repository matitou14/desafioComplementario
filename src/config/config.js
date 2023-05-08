import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ADMIN_MAIL: process.env.ADMIN_MAIL,
  ADMIN_PASS: process.env.ADMIN_PASS ,
};

export default config;
