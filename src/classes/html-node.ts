export class HtmlNode {
  public data: Data;
  public type: string;

  constructor(data: Data, type: string) {
    this.data = data;
    this.type = type;
  }

  get isParsable(): boolean {
    return ["text", "h2"].includes(this.type);
  }

  get textElement(): string {
    return this.data?.text;
  }
}

export class Data {
  public text: string;
  public type: string;

  constructor(text: string, type: string) {
    this.text = text;
    this.type = type;
  }
}
