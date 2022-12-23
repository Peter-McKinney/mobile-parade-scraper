import axios from "axios";
import { JSONFileWriter } from "./classes/json-file-writer";
import { LogUtil } from "./classes/log.util";
import { ParadeScheduleParser } from "./classes/parade-schedule-parser";

const url =
  "https://www.arcgis.com/sharing/rest/content/items/aa1969cf3b68462a8676acdfb4839ad4/data?f=json";
const AxiosInstance = axios.create();

export function scrape(): void {
  AxiosInstance.get(url)
    .then((response) => {
      const parser = new ParadeScheduleParser();
      const schedule = parser.buildParadeSchedule(response.data);
      LogUtil.log(schedule);

      const fileWriter = new JSONFileWriter("output");
      fileWriter.writeFormattedFile(schedule);
      fileWriter.writeMinifiedFile(schedule);

      LogUtil.log("\nParade schedule generated successfully!");
    })
    .catch(console.error);
}
