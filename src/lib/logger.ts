import fs from "fs";

export class Logger {
    public static logToConsole(message: string) {
        fs.writeSync(
            1,
            `${new Date().toLocaleString()} - ${message}\n`
        );
    }
}