import { LogUtil } from "../src/classes/log.util";

describe("log util", () => {
  const previous_env = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.clearAllMocks();
    process.env = { ...previous_env };
  });

  afterAll(() => {
    process.env = previous_env;
  });

  it("should log if logging enabled", () => {
    process.env.logging = "true";
    const spy = jest.spyOn(console, "log");

    LogUtil.log("test logging string");

    expect(spy).toHaveBeenCalledWith("test logging string");
  });

  it("should NOT log if logging disabled", () => {
    const spy = jest.spyOn(console, "log");

    LogUtil.log("test logging string");

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
