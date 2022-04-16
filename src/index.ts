import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import { ParadeScheduleResponse } from "./classes/ParadeScheduleResponse";

const loggingEnabled = process.env.logging === "true" || false;
const url =
  "https://www.arcgis.com/sharing/rest/content/items/aa1969cf3b68462a8676acdfb4839ad4/data?f=json";
const AxiosInstance = axios.create();
const cheerioOptions = { decodeEntities: false };

AxiosInstance.get(url)
  .then((response) => {
    const schedule = buildParadeSchedule(response.data);
    log(schedule);
    fs.writeFileSync("parade-schedule.json", JSON.stringify(schedule));
  })
  .catch(console.error);

export function buildParadeSchedule(response: ParadeScheduleResponse) {
  let currentDate: Date = null;
  const schedule = {};

  for (const node in response.nodes) {
    try {
      const html = response.nodes[node]?.data?.text;

      currentDate = parseParadeDate(html) ?? currentDate;
      const [currentOrg, currentTime] = parseParadeOrg(html);

      if (currentDate && currentOrg) {
        const combinedDate = combineDateTime(currentDate, currentTime);
        schedule[currentOrg] = combinedDate;
      }
    } catch (err) {
      log(err);
    }
  }

  return schedule;
}

export function removeHtml(html: string) {
  return decodeHTMLEntities(html.replace(/(<([^>]+)>)/gi, ""));
}

export function decodeHTMLEntities(encodedString: string) {
  const translateRegExp = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
    nbsp: " ",
    amp: "&",
    quot: "'",
    lt: "<",
    gt: ">",
  };

  return encodedString
    .replace(translateRegExp, function (match, entity) {
      return translate[entity];
    })
    .replace(/&#(\d+);/gi, function (match, numStr) {
      const num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
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
    const orgNameWithTime = removeHtml(organizationName);
    const orgNameSplit = orgNameWithTime.split("-");

    sanitizedOrgName = orgNameSplit[1].trim();
    sanitizedTime = orgNameSplit[0].trim();
  }

  return [sanitizedOrgName, sanitizedTime];
}

export function combineDateTime(date: Date, time: string): Date {
  const time24h = convert12hrTo24hr(time);
  const [hours, minutes] = time24h.split(":");

  date.setUTCHours(+hours, +minutes);

  return date;
}

export function convert12hrTo24hr(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  let hoursInt = 0;

  const [hours, minutes] = time.split(":");

  if (modifier.toUpperCase() === "PM") {
    hoursInt = parseInt(hours === "12" ? "00" : hours, 10) + 12;
  }

  return `${hoursInt}:${minutes}`;
}

export function log(logInfo: unknown) {
  if (loggingEnabled) {
    console.log(logInfo);
  }
}
