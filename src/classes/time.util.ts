export class TimeUtil {
  static combineDateTime(date: Date, time: string): Date {
    const time24h = this.convert12hrTo24hr(time);
    const [hours, minutes] = time24h.split(":");

    date.setUTCHours(+hours, +minutes);

    return date;
  }

  static convert12hrTo24hr(time12h: string): string {
    const [time, modifier] = time12h.split(" ");
    let hoursInt = 0;

    const [hours, minutes] = time.split(":");

    if (modifier.toUpperCase() === "PM") {
      hoursInt = parseInt(hours === "12" ? "00" : hours, 10) + 12;
    }

    return `${hoursInt}:${minutes}`;
  }
}
