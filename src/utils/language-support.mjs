const messages = {
  en: {
    critical: "is critical!",
    warningLow: "Warning: Approaching",
    warningHigh: "Warning: Approaching",
  },
  de: {
    critical: "ist kritisch!",
    warningLow: "Warnung: Annäherung",
    warningHigh: "Warnung: Annäherung",
  },
  hi: {
    critical: "गंभीर है!",
    warningLow: "चेतावनी: पास आ रहा है hypoxia",
    warningHigh: "चेतावनी: पास आ रहा है hypoxia",
  },
};

export function translateMessage(messageKey, language = "en") {
  return messages[language][messageKey];
}
