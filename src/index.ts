import axios from "axios";
import cheerio from "cheerio";
import { HTMLDecoder } from "./classes/HTMLDecoder";
import { JSONFileWriter } from "./classes/JSONFileWriter";
import { ParadeScheduleResponse } from "./classes/ParadeScheduleResponse";
import { TimeUtil } from "./classes/time.util";

const loggingEnabled = process.env.logging === "true" || false;
const url =
  "https://www.arcgis.com/sharing/rest/content/items/aa1969cf3b68462a8676acdfb4839ad4/data?f=json";
const AxiosInstance = axios.create();
const cheerioOptions = { decodeEntities: false };

export function scrape(): void {
  AxiosInstance.get(url)
    .then((response) => {
      const schedule = buildParadeSchedule(response.data);
      log(schedule);

      const fileWriter = new JSONFileWriter();
      fileWriter.writeFormattedFile(schedule);
      fileWriter.writeMinifiedFile(schedule);

      console.log("\nParade schedule generated successfully!");
    })
    .catch(console.error);
}

export function buildParadeSchedule(
  response: ParadeScheduleResponse
): Record<string, Date> {
  let currentDate: Date = null;
  const schedule: Record<string, Date> = {};

  for (const node in response.nodes) {
    try {
      const html = response.nodes[node]?.data?.text;

      currentDate = parseParadeDate(html) ?? currentDate;
      const [currentOrg, currentTime] = parseParadeOrg(html);

      if (currentDate && currentOrg) {
        const combinedDate = TimeUtil.combineDateTime(currentDate, currentTime);
        schedule[currentOrg] = combinedDate;
      }
    } catch (err) {
      log(err);
    }
  }

  return schedule;
}

export function isOrg(orgString: string): boolean {
  const timeRegEx = new RegExp(/(\d+):(\d+).(am|pm|noon)/);

  return orgString && timeRegEx.test(orgString);
}

export function parseParadeDate(html: string): Date | null {
  const currentYear = new Date().getFullYear();
  const $ = cheerio.load(html, cheerioOptions);

  const dateString = $("strong").html();

  const currentDate =
    dateString && Date.parse(dateString) ? new Date(dateString) : null;

  if (currentDate) {
    currentDate.setFullYear(currentYear);
  }

  return currentDate;
}

export function parseParadeOrg(html: string): [string, string] {
  const $ = cheerio.load(html, cheerioOptions);
  const organizationName = $("a").html();

  let sanitizedOrgName = "";
  let sanitizedTime = "";

  if (isOrg(organizationName)) {
    const orgNameWithTime = HTMLDecoder.removeHtml(organizationName);
    const orgNameSplit = orgNameWithTime.split("-");

    sanitizedOrgName = orgNameSplit[1].trim();
    sanitizedTime = orgNameSplit[0].trim();
  }

  return [sanitizedOrgName, sanitizedTime];
}

export function log(logInfo: unknown) {
  if (loggingEnabled) {
    console.log(logInfo);
  }
}
