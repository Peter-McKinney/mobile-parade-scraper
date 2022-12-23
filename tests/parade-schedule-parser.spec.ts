import { HtmlNode } from "../src/classes/html-node";
import { LogUtil } from "../src/classes/log.util";
import { ParadeScheduleParser } from "../src/classes/parade-schedule-parser";
import { ParadeScheduleResponse } from "../src/classes/parade-schedule-response";
import { TimeUtil } from "../src/classes/time.util";

describe("ParadeScheduleParser", () => {
  const parser = new ParadeScheduleParser();
  parser.currentYear = "2023";

  describe("buildParadeSchedule", () => {
    const response = new ParadeScheduleResponse();
    response.nodes = [
      {
        data: {
          text: "something",
          type: "text",
        },
        type: "text",
      } as HtmlNode,
      {
        data: {
          text: "something else",
          type: "text",
        },
        type: "text",
      } as HtmlNode,
    ];

    afterEach(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });

    it("should return the parade schedule", () => {
      jest
        .spyOn(parser, "parseParadeDate")
        .mockReturnValue(new Date("3/5/2022"));

      jest
        .spyOn(parser, "parseParadeOrg")
        .mockReturnValue(["New Fake Org", "12:00PM"]);

      jest
        .spyOn(TimeUtil, "combineDateTime")
        .mockReturnValue(new Date("3/5/2022 12:00Z"));

      const schedule = parser.buildParadeSchedule(response);

      expect(schedule["2022-03-05T12:00:00.000Z"]).toBe("New Fake Org");
    });

    it("it should log an error", () => {
      jest.spyOn(parser, "parseParadeDate").mockReturnValue(null);

      jest.spyOn(parser, "parseParadeOrg").mockImplementation(() => {
        throw new Error();
      });

      const logSpy = jest.spyOn(LogUtil, "log");

      const schedule = parser.buildParadeSchedule(response);

      expect(logSpy).toHaveBeenCalled();
      expect(Object.keys(schedule).length).toBe(0);
    });
  });

  describe("isOrg", () => {
    it("should return true if org string", function () {
      expect(parser.isOrg("12:00 noon")).toBe(true);
    });

    it("should return false if not org string", () => {
      expect(parser.isOrg("lksdflkjf <")).toBe(false);
    });
  });

  describe("parseParadeDate", () => {
    it("should parse date", () => {
      const html = "<body><p><strong>SUNDAY, FEBRUARY 20</strong></p></body>";
      const expectedDate = new Date("2/20/2023");
      expect(parser.parseParadeDate(html)?.toDateString()).toBe(
        expectedDate.toDateString()
      );
    });

    it("it should return null for unparsable date", () => {
      const html =
        "<body><p><strong>this is not , a , date</strong></p></body>";

      expect(parser.parseParadeDate(html)).toBe(null);
    });
  });

  describe("parseParadeOrg", () => {
    it("should parse parade organization", () => {
      const html =
        "<body><p><a>7:00 pm - Order of Butterfly Maidens Parade</a></p></body>";
      const org = parser.parseParadeOrg(html);

      expect(org[1]).toBe("7:00 pm");
      expect(org[0]).toBe("Order of Butterfly Maidens Parade");
    });
  });
});
