export class LogUtil {
  static log(logInfo: unknown) {
    if (Boolean(process.env.logging)) {
      console.log(logInfo);
    }
  }
}
