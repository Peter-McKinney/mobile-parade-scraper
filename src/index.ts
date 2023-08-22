import axios from "axios";
import { CSVFileWriter } from "./classes/csv-file-writer";
import { JSONFileWriter } from "./classes/json-file-writer";
import { LogUtil } from "./classes/log.util";
import { ParadeScheduleParser } from "./classes/parade-schedule-parser";
import { FileWriter } from "./interfaces/FileWriter";

const url =
  "https://www.arcgis.com/sharing/rest/content/items/aa1969cf3b68462a8676acdfb4839ad4/data?f=json";
const AxiosInstance = axios.create();

export function scrape(): void {
  AxiosInstance.get(url)
    .then((response) => {
      const parser = new ParadeScheduleParser();
      const schedule = parser.buildParadeSchedule(response.data);
      LogUtil.log(schedule);

      const fileWriters = getFileWriters();
      fileWriters.forEach((f) => f.writeAllFiles(schedule));

      LogUtil.log("\nParade schedule generated successfully!");
    })
    .catch(console.error);
}

function getFileWriters(): FileWriter[] {
  return [new CSVFileWriter("output"), new JSONFileWriter("output")];
}
