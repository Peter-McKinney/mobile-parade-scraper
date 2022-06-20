import fs from "fs";

export class JSONFileWriter {
  minifiedFileName = "parade-schedule.json";
  formattedFileName = "parade-schedule.formatted.json";
  outputDirectory = "dist";

  writeFormattedFile(schedule: Record<string, Date>): void {
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
