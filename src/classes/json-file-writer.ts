import fs from "fs";
import { FileWriter } from "../interfaces/FileWriter";
import { LogUtil } from "./log.util";

export class JSONFileWriter implements FileWriter {
  minifiedFileName: string = "parade-schedule.json";
  formattedFileName: string = "parade-schedule.formatted.json";
  outputDirectory: string;

  constructor(outputDirectory: string) {
    this.outputDirectory = outputDirectory;

    if (!fs.existsSync(this.outputDirectory)) {
      fs.mkdirSync(this.outputDirectory);
    }
  }

  writeAllFiles(schedule: Record<string, string>): void {
    this.writeFormattedFile(schedule);
    this.writeFile(schedule);
  }

  writeFormattedFile(schedule: Record<string, string>): void {
    fs.writeFileSync(
      `${this.outputDirectory}/${this.formattedFileName}`,
      JSON.stringify(schedule, null, 2)
    );

    LogUtil.log(
      `File written ${this.outputDirectory}/${this.formattedFileName}`
    );
  }

  writeFile(schedule: Record<string, string>): void {
    fs.writeFileSync(
      `${this.outputDirectory}/${this.minifiedFileName}`,
      JSON.stringify(schedule)
    );

    LogUtil.log(
      `File written ${this.outputDirectory}/${this.minifiedFileName}`
    );
  }
}
