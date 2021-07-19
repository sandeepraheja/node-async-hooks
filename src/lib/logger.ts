import fs from "fs";

export class Logger {
    public static logToConsole(message: any) {
        fs.writeSync(
            1,
            `${new Date().toLocaleString()} - ${message ? JSON.stringify(message) : message }\n`
        );
    }
}