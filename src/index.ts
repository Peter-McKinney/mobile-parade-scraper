import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import { ParadeScheduleResponse } from "./classes/ParadeScheduleResponse";

const loggingEnabled = process.env.logging || false;
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
      const currentOrg = parseParadeOrg(html);

      if (currentDate && currentOrg) {
        schedule[currentOrg] = currentDate;
      }
    } catch (err) {
      if (loggingEnabled) {
        console.warn(err, "error ======================");
      }
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

export function parseParadeOrg(html: string): string | null {
  const $ = cheerio.load(html, cheerioOptions);
  const organizationName = $("a").html();

  return isOrg(organizationName) ? removeHtml(organizationName) : null;
}

export function log(logInfo: unknown) {
  if (loggingEnabled) {
    console.log(logInfo);
  }
}
