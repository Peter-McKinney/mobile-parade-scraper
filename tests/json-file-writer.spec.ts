import fs from "fs";

jest.mock("fs");
import { JSONFileWriter } from "../src/classes/json-file-writer";

describe("JSONFileWriter", () => {
  const fileWriter: JSONFileWriter = new JSONFileWriter("dist");
  const schedule: Record<string, Date> = {};

  beforeAll(() => {
    schedule["something"] = new Date();
    schedule["else"] = new Date();
  });

  describe("formatted json file output", () => {
    it("should write formatted file", () => {
      const expectedFormattedString = JSON.stringify(schedule, null, 2);

      fileWriter.writeFormattedFile(schedule);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "dist/parade-schedule.formatted.json",
        expectedFormattedString
      );
    });

    it("should log formatted file name", () => {
      const logSpy = jest.spyOn(console, "log");

      fileWriter.writeFormattedFile(schedule);
      expect(logSpy).toHaveBeenCalledWith(
        "File written dist/parade-schedule.formatted.json"
      );
    });
  });

  describe("minified json file output", () => {
    it("should write minified file", () => {
      const expectedMinifiedString = JSON.stringify(schedule);

      fileWriter.writeMinifiedFile(schedule);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "dist/parade-schedule.json",
        expectedMinifiedString
      );
    });

    it("should log minified file name", () => {
      const logSpy = jest.spyOn(console, "log");

      fileWriter.writeMinifiedFile(schedule);
      expect(logSpy).toHaveBeenCalledWith(
        "File written dist/parade-schedule.json"
      );
    });
  });
});
