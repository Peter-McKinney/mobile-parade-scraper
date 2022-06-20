import { ParadeScheduleParser } from "../src/classes/parade-schedule-parser";

describe("ParadeScheduleParser", () => {
  const parser = new ParadeScheduleParser();

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
      const expectedDate = new Date("2/20/2022");
      expect(parser.parseParadeDate(html).toDateString()).toBe(
        expectedDate.toDateString()
      );
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
