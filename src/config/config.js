import dotenv from 'dotenv'
const enviroment  = 'PRODUCTION'

dotenv.config({
    path: enviroment === 'DEVELOPMENT'
    ? '.env.dev'
    : '.env.production'
})

export default {
    PORT: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPass: process.env.ADMIN_PASS,
}
