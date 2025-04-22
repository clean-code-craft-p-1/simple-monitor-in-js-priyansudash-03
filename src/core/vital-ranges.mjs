import { translateMessage } from '../utils/language-support.mjs';

export function isVitalInRange(value, min, max) {
  return value >= min && value <= max;
}

export function getVitalStatus(temperature, pulseRate, spo2, language = "en") {
  const tolerance = 1.5 / 100; // 1.5% tolerance
  const vitalChecks = [
    {
      value: temperature,
      min: 95,
      max: 102,
      warningLow: 95 + tolerance * (102 - 95), // Adjusted calculation
      warningHigh: 102 - tolerance * (102 - 95), // Adjusted calculation
      messages: {
        critical: translateMessage("critical", language),
        warningLow: `${translateMessage("warningLow", language)} hypothermia`,
        warningHigh: `${translateMessage("warningHigh", language)} hyperthermia`,
      },
    },
    {
      value: pulseRate,
      min: 60,
      max: 100,
      warningLow: 60 + tolerance * (100 - 60), // Adjusted calculation
      warningHigh: 100 - tolerance * (100 - 60), // Adjusted calculation
      messages: {
        critical: translateMessage("critical", language),
        warningLow: `${translateMessage("warningLow", language)} bradycardia`,
        warningHigh: `${translateMessage("warningHigh", language)} tachycardia`,
      },
    },
    {
      value: spo2,
      min: 90,
      max: Infinity,
      warningLow: 90 + tolerance * 10, // Assuming 100 as a reference for SPO2
      warningHigh: Infinity,
      messages: {
        critical: translateMessage("critical", language),
        warningLow: `${translateMessage("warningLow", language)} hypoxia`,
        warningHigh: "",
      },
    },
  ];

  return vitalChecks.map((vital) => {
    if (!isVitalInRange(vital.value, vital.min, vital.max)) {
      return vital.messages.critical;
    } else if (vital.value >= vital.min && vital.value < vital.warningLow) {
      return vital.messages.warningLow;
    } else if (vital.value > vital.warningHigh && vital.value <= vital.max) {
      return vital.messages.warningHigh;
    }
    return null;
  }).filter(Boolean); // Remove null messages
};
