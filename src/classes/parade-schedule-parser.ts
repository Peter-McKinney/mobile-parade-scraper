import cheerio from "cheerio";
import { HTMLDecoder } from "./html-decoder";
import { HtmlNode } from "./html-node";
import { LogUtil } from "./log.util";
import { ParadeScheduleResponse } from "./parade-schedule-response";
import { TimeUtil } from "./time.util";

const cheerioOptions = { decodeEntities: false };

export class ParadeScheduleParser {
  currentYear: string = "";

  buildParadeSchedule(
    response: ParadeScheduleResponse
  ): Record<string, string> {
    let currentDate: Date = null;
    const schedule: Record<string, string> = {};

    for (const node in response.nodes) {
      try {
        const htmlNode = new HtmlNode(
          response.nodes[node]?.data,
          response.nodes[node]?.type
        );

        if (htmlNode.isParsable) {
          if (htmlNode.textElement.includes("Schedule")) {
            this.currentYear = this.parseScheduleYear(htmlNode.textElement);
          } else {
            currentDate =
              this.parseParadeDate(htmlNode.textElement) ?? currentDate;

            const [currentOrg, currentTime] = this.parseParadeOrg(
              htmlNode.textElement
            );

            if (currentDate && currentOrg) {
              const combinedDate: Date = TimeUtil.combineDateTime(
                currentDate,
                currentTime
              );
              schedule[combinedDate.toISOString()] = currentOrg;
            }
          }
        }
      } catch (err) {
        LogUtil.log(err);
      }
    }

    return schedule;
  }

  isOrg(orgString: string): boolean {
    const timeRegEx = new RegExp(/(\d+):(\d+).(am|pm|noon)/);

    return orgString && timeRegEx.test(orgString);
  }

  parseScheduleYear(html: string): string {
    const year = html.split("-")[1].trim();
    return year;
  }

  parseParadeDate(html: string): Date | null {
    const $ = cheerio.load(html, cheerioOptions);

    const dateString = $("strong").html();

    const currentDate =
      dateString && Date.parse(dateString) ? new Date(dateString) : null;

    if (currentDate) {
      currentDate.setFullYear(+this.currentYear);
    }

    return currentDate;
  }

  parseParadeOrg(html: string): [string, string] {
    const $ = cheerio.load(html, cheerioOptions);
    const organizationName = $("a").html();

    let sanitizedOrgName = "";
    let sanitizedTime = "";

    if (this.isOrg(organizationName)) {
      const orgNameWithTime = HTMLDecoder.removeHtml(organizationName);
      const orgNameSplit = orgNameWithTime.split("-");

      sanitizedOrgName = orgNameSplit[1].trim();
      sanitizedTime = orgNameSplit[0].trim();
    }

    return [sanitizedOrgName, sanitizedTime];
  }
}
