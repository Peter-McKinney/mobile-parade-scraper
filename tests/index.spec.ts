import {
  combineDateTime,
  isOrg,
  parseParadeDate,
  parseParadeOrg,
  removeHtml,
} from "../src/index";
import { expect } from "chai";

describe("isOrg", () => {
  it("should return true if org string", function () {
    expect(isOrg("12:00 noon")).to.be.true;
  });

  it("should return false if not org string", () => {
    expect(isOrg("lksdflkjf <")).to.be.false;
  });
});

describe("removeHtml", () => {
  it("should return sanitized string", () => {
    const html = "<body><p>hello</p></body>";
    const sanitizedString = removeHtml(html);

    expect(sanitizedString).to.be.equal("hello");
  });
});

describe("parseParadeDate", () => {
  it("should parse date", () => {
    const html = "<body><p><strong>SUNDAY, FEBRUARY 20</strong></p></body>";
    const expectedDate = new Date("2/20/2022");
    expect(parseParadeDate(html).toDateString()).to.equal(
      expectedDate.toDateString()
    );
  });
});

describe("parseParadeOrg", () => {
  it("should parse parade organization", () => {
    const html =
      "<body><p><a>7:00 pm - Order of Butterfly Maidens Parade</a></p></body>";
    const org = parseParadeOrg(html);

    expect(org[0]).to.be.equal("Order of Butterfly Maidens Parade");
    expect(org[1]).to.be.equal("7:00 pm");
  });
});

describe("combineDateTime", () => {
  const date = new Date("3/5/2022");
  const time = "7:30 pm";
  const expectedDate = new Date("3/5/2022 19:30:00Z");

  const combinedDate = combineDateTime(date, time);
  expect(combinedDate.toString()).to.be.equal(expectedDate.toString());
});
