import { TimeUtil } from "../src/classes/time.util";

describe("combineDateTime", () => {
  it("should combine date time", () => {
    const date = new Date("3/5/2022");
    const time = "7:30 pm";
    const expectedDate = new Date("3/5/2022 19:30:00");

    const combinedDate = TimeUtil.combineDateTime(date, time);
    expect(combinedDate.toString()).toBe(expectedDate.toString());
  });

  it("should combine date time for midnight", () => {
    const date = new Date("3/5/2022");
    const time = "12:00 am";
    const expectedDate = new Date("3/5/2022 00:00");

    const combinedDate = TimeUtil.combineDateTime(date, time);
    expect(combinedDate.toString()).toBe(expectedDate.toString());
  });

  it("should combine date time for noon", () => {
    const date = new Date("3/5/2022");
    const time = "12:00 pm";
    const expectedDate = new Date("3/5/2022 12:00");

    const combinedDate = TimeUtil.combineDateTime(date, time);
    expect(combinedDate.toString()).toBe(expectedDate.toString());
  });
});
