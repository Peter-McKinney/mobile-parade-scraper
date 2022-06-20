import { TimeUtil } from "../src/classes/time.util";

describe("combineDateTime", () => {
  it("should combine date time", () => {
    const date = new Date("3/5/2022");
    const time = "7:30 pm";
    const expectedDate = new Date("3/5/2022 19:30:00Z");

    const combinedDate = TimeUtil.combineDateTime(date, time);
    expect(combinedDate.toString()).toBe(expectedDate.toString());
  });
});
