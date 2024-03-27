import * as Localize from "expo-localization";
import moment from "moment-timezone";

class DateUtils {
  timezone = Localize.getCalendars().shift().timeZone;

  constructor(timezone?: string) {
    if (timezone) {
      this.timezone = timezone;
    }
  }

  formatToDate(date: string, withHours?: boolean, tz?: string) {
    const isoDate = moment(date);
    const tzDate = isoDate.tz(tz || this.timezone);

    return tzDate.format(withHours ? "DD/MM/yy, HH:mm" : "DD/MM/yy");
  }

  formatToHour(date: string) {
    const isoDate = moment(date);
    const tzDate = isoDate.tz(this.timezone);

    return tzDate.format("hh:mm");
  }

  convertToMillis(time: number, type: "HOURS" | "MINUTES" | "SECONDS") {
    switch (type) {
      case "HOURS":
        return time * 60 * 60 * 1000;
      case "MINUTES":
        return time * 60 * 1000;
      default:
        return time * 1000;
    }
  }
}

export { DateUtils };
