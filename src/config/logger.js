import winston, { transports } from "winston";
import dotenv from 'dotenv'



dotenv.config()

const logLevels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5
  };
  
  // Configuración del logger para desarrollo
  const developmentLogger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console()
    ]
  });
  
  // Configuración del logger para producción
  const productionLogger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.File({ filename: 'errors.log', level: 'info' })
    ]
  });
  
  // Seleccionar el logger según el entorno
  const logger = process.env.NODE_ENV === 'PROD' ? productionLogger : developmentLogger;
  
  export default logger;