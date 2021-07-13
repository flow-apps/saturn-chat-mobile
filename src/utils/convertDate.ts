import * as Localize from "expo-localization";
import { format, parseISO } from "date-fns";
import { convertToTimeZone } from "date-fns-timezone";

class ConvertDate {
  timezone = Localize.timezone;

  constructor(timezone?: string) {
    if (timezone) {
      this.timezone = timezone;
    }
  }

  formatToDate(date: string, withHours?: boolean, tz?: string) {
    const isoDate = parseISO(date);
    const tzDate = convertToTimeZone(isoDate, {
      timeZone: tz || Localize.timezone,
    });

    return format(tzDate, withHours ? "dd/MM/yy, HH:mm" : "dd/MM/yy");
  }

  formatToHour(date: string) {
    const isoDate = parseISO(date);
    const tzDate = convertToTimeZone(isoDate, {
      timeZone: Localize.timezone,
    });

    return format(tzDate, "hh:mm");
  }
}

export { ConvertDate };
