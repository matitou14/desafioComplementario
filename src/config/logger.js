import { format } from "path";
import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            levels: {
                debug: 0,
                http: 1,
                info: 2,
                warning: 3,
                error: 4,
                fatal:5,
            },

            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            )
        }),
    //     new winston.transports.File({
    //         filename: "errors.log",
    //         level:"info",
    //         format: winston.format.simple()
    //     })
    ],
  });


export default logger