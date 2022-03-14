import {
  decodeHTMLEntities,
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

describe("decodeHTML", () => {
  it("should return encoded html string", () => {
    const encodedHtml = "&";
    expect(decodeHTMLEntities(encodedHtml)).to.be.equal("&amp");
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

describe('parseParadeOrg', () => {
    it('should parse parade organization', () => {
        const html = '<body><p><a>7:00 pm - Order of Butterfly Maidens Parade</a></p></body>';
        const org = parseParadeOrg(html);

        expect(org).to.be.equal('7:00 pm - Order of Butterfly Maidens Parade');
    });
});
