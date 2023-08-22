import { HTMLDecoder } from "../src/classes/html-decoder";

describe("HTMLDecoder", () => {
  it("should remove html from html string", () => {
    const html = "<body><p>some test text here</p></body>";
    const stringWithoutHTML = HTMLDecoder.removeHtml(html);

    expect(stringWithoutHTML).toEqual("some test text here");
  });

  it("should return decoded html string", () => {
    const encodedHtml = "&nbsp;&amp;some test text here&nbsp;&amp;";

    const decodedHtml = HTMLDecoder.decodeHTMLEntities(encodedHtml);

    expect(decodedHtml).toEqual(" &some test text here &");
  });

  it("should return decoded html string from number encoding", () => {
    const encodedHtml = "&#33;";

    const decodedHtml = HTMLDecoder.decodeHTMLEntities(encodedHtml);

    expect(decodedHtml).toEqual("!");
  });
});
