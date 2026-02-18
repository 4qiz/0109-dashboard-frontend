import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function formatLastUpdate(lastUpdate: string | Date) {
  const date = new Date(lastUpdate);

  const formatted = date.toLocaleString("ru-RU", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const timeAgo = formatDistanceToNow(date, {
    addSuffix: true,
    locale: ru,
  });

  return {
    formatted,
    timeAgo,
  };
}
