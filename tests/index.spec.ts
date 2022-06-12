import {
  combineDateTime,
  isOrg,
  parseParadeDate,
  parseParadeOrg,
  removeHtml,
} from "../src/index";

describe("isOrg", () => {
  it("should return true if org string", function () {
    expect(isOrg("12:00 noon")).toBe(true);
  });

  it("should return false if not org string", () => {
    expect(isOrg("lksdflkjf <")).toBe(false);
  });
});

describe("removeHtml", () => {
  it("should return sanitized string", () => {
    const html = "<body><p>hello</p></body>";
    const sanitizedString = removeHtml(html);

    expect(sanitizedString).toBe("hello");
  });
});

describe("parseParadeDate", () => {
  it("should parse date", () => {
    const html = "<body><p><strong>SUNDAY, FEBRUARY 20</strong></p></body>";
    const expectedDate = new Date("2/20/2022");
    expect(parseParadeDate(html).toDateString()).toBe(
      expectedDate.toDateString()
    );
  });
});

describe("parseParadeOrg", () => {
  it("should parse parade organization", () => {
    const html =
      "<body><p><a>7:00 pm - Order of Butterfly Maidens Parade</a></p></body>";
    const org = parseParadeOrg(html);

    expect(org[1]).toBe("7:00 pm");
    expect(org[0]).toBe("Order of Butterfly Maidens Parade");
  });
});

describe("combineDateTime", () => {
  const date = new Date("3/5/2022");
  const time = "7:30 pm";
  const expectedDate = new Date("3/5/2022 19:30:00Z");

  const combinedDate = combineDateTime(date, time);
  expect(combinedDate.toString()).toBe(expectedDate.toString());
});
