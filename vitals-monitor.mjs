function isVitalInRange(value, min, max) {
  return value >= min && value <= max;
}

function getVitalStatus(temperature, pulseRate, spo2) {
  const issues = [];
  if (!isVitalInRange(temperature, 95, 102)) {
    issues.push("Temperature is critical!");
  }
  if (!isVitalInRange(pulseRate, 60, 100)) {
    issues.push("Pulse Rate is out of range!");
  }
  if (!isVitalInRange(spo2, 90, Infinity)) {
    issues.push("Oxygen Saturation out of range!");
  }
  return issues;
}

async function alert(messages, testMode = false) {
  for (const message of messages) {
    console.log(message);
    const delay = testMode ? 10 : 1000; // Use 10ms delay in test mode, 1000ms otherwise
    for (let i = 0; i < 6; i++) {
      process.stdout.write("\r* ");
      await new Promise(resolve => setTimeout(resolve, delay));
      process.stdout.write("\r *");
      await new Promise(resolve => setTimeout(resolve, delay));
    }
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
