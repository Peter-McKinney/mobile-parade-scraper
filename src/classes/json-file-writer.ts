import fs from "fs";

export class JSONFileWriter {
  minifiedFileName: string = "parade-schedule.json";
  formattedFileName: string = "parade-schedule.formatted.json";
  outputDirectory: string;

  constructor(outputDirectory: string) {
    this.outputDirectory = outputDirectory;

    if (!fs.existsSync(this.outputDirectory)) {
      fs.mkdirSync(this.outputDirectory);
    }
  }

  writeFormattedFile(schedule: Record<string, Date>): void {
    console.log(schedule);
    fs.writeFileSync(
      `${this.outputDirectory}/${this.formattedFileName}`,
      JSON.stringify(schedule, null, 2)
    );

    console.log(
      `File written ${this.outputDirectory}/${this.formattedFileName}`
    );
  }

  writeMinifiedFile(schedule: Record<string, Date>): void {
    fs.writeFileSync(
      `${this.outputDirectory}/${this.minifiedFileName}`,
      JSON.stringify(schedule)
    );

    console.log(
      `File written ${this.outputDirectory}/${this.minifiedFileName}`
    );
  }
}
