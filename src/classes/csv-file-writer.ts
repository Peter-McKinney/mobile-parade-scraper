import fs from "fs";
import { FileWriter } from "../interfaces/FileWriter";

export class CSVFileWriter implements FileWriter {
  csvFileName: string = "parade-schedule.csv";
  outputDirectory: string;

  constructor(outputDirectory: string) {
    this.outputDirectory = outputDirectory;
  }

  writeAllFiles(schedule: Record<string, string>): void {
    this.writeFile(schedule);
  }

  writeFile(schedule: Record<string, string>): void {
    fs.writeFileSync(
      `${this.outputDirectory}/${this.csvFileName}`,
      this.convertToCSV(schedule)
    );
  }

  private convertToCSV(schedule: Record<string, string>): string {
    let csvContent = "Organization,Time\n";

    for (const key in schedule) {
      if (schedule.hasOwnProperty(key)) {
        csvContent += `${schedule[key]},${key}\n`;
      }
    }

    return csvContent;
  }
}
