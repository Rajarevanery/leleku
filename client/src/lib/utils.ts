export const approxReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const extractPlainText = (markdown: string): string => {
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/#+\s*/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`{1,3}([\s\S]*?)`{1,3}/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/>+\s*/g, "")
    .replace(/[-*]\s+/g, "")
    .replace(/\|\s*([\w\s]+)\s*\|/g, "$1")
    .replace(/\|[-\s|]+\|/g, "")
    .replace(/--+/g, "")
    .replace(/:[a-z_]+:/g, "")
    .replace(/\p{Emoji}/gu, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};
export const convertExp = ({
  readingTime,
  difficulty,
}: {
  readingTime: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PAKARLELE";
}): number => {
  const baseExp = 200;

  switch (difficulty) {
    case "BEGINNER":
      return baseExp * readingTime;
    case "INTERMEDIATE":
      return baseExp * 1.5 * readingTime;
    case "ADVANCED":
      return baseExp * 2 * readingTime;
    case "PAKARLELE":
      return baseExp * 3 * readingTime;
    default:
      return 0;
  }
};

export const convertDifficultyToColor = (
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PAKARLELE"
) => {
  switch (difficulty) {
    case "BEGINNER":
      return "bg-green-500";
    case "INTERMEDIATE":
      return "bg-blue-500";
    case "ADVANCED":
      return "bg-orange-500";
    case "PAKARLELE":
      return "bg-purple-500";
    default:
      return "";
  }
};
