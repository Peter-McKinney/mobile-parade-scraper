import fs from "fs";

jest.mock("fs");
import { JSONFileWriter } from "../src/classes/json-file-writer";

describe("JSONFileWriter", () => {
  const fileWriter: JSONFileWriter = new JSONFileWriter("dist");
  const schedule: Record<string, string> = {};

  beforeAll(() => {
    schedule["something"] = new Date().toISOString();
    schedule["else"] = new Date().toISOString();
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
  });

  describe("minified json file output", () => {
    it("should write minified file", () => {
      const expectedMinifiedString = JSON.stringify(schedule);

      fileWriter.writeFile(schedule);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "dist/parade-schedule.json",
        expectedMinifiedString
      );
    });
  });
});
