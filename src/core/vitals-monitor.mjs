import { getVitalStatus } from './vital-ranges.mjs';
import { alert } from '../utils/alert.mjs';
import { convertTemperature } from './unit-conversion.mjs';

export async function vitalsOk(temperature, pulseRate, spo2, unit = "F", delay = 1000, language = "en") {
  const tempInF = convertTemperature(temperature, unit);
  const issues = getVitalStatus(tempInF, pulseRate, spo2, language);

  if (issues.length > 0) {
    await alert(issues, delay);
    return false;
  }
  return true;
}
