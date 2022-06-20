export class HTMLDecoder {
  static removeHtml(html: string): string {
    return this.decodeHTMLEntities(html.replace(/(<([^>]+)>)/gi, ""));
  }

  static decodeHTMLEntities(encodedString: string): string {
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
}
