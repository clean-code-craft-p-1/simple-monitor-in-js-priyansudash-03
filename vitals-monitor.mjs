function isVitalInRange(value, min, max) {
  return value >= min && value <= max;
}

function getVitalStatus(temperature, pulseRate, spo2) {
  const vitalChecks = [
    { value: temperature, min: 95, max: 102, message: "Temperature is critical!" },
    { value: pulseRate, min: 60, max: 100, message: "Pulse Rate is out of range!" },
    { value: spo2, min: 90, max: Infinity, message: "Oxygen Saturation out of range!" },
  ];

  return vitalChecks
    .filter(vital => !isVitalInRange(vital.value, vital.min, vital.max))
    .map(vital => vital.message);
}

async function blink(times, delay) {
  for (let i = 0; i < times; i++) {
    process.stdout.write("\r* ");
    await new Promise(resolve => setTimeout(resolve, delay));
    process.stdout.write("\r *");
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

async function alert(messages, testMode = false) {
  const delay = testMode ? 10 : 1000; // Use 10ms delay in test mode, 1000ms otherwise
  for (const message of messages) {
    console.log(message);
    await blink(6, delay);
  }
}

export async function vitalsOk(temperature, pulseRate, spo2, testMode = false) {
  const issues = getVitalStatus(temperature, pulseRate, spo2);
  if (issues.length > 0) {
    await alert(issues, testMode); // Pass testMode to alert
    return false;
  }
  return true;
}
