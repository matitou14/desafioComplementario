import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPass: process.env.ADMIN_PASS,
}
