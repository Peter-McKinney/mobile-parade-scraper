export class LogUtil {
  static log(logInfo: unknown) {
    if (process.env.logging) {
      console.log(logInfo);
    }
  }
}
