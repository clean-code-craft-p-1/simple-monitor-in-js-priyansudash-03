export async function blink(times, delay) {
  for (let i = 0; i < times; i++) {
    process.stdout.write("\r* ");
    await new Promise((resolve) => setTimeout(resolve, delay));
    process.stdout.write("\r *");
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

export async function alert(messages, delay = 1000) {
  for (const message of messages) {
    console.log(message); // Ensure all messages are logged
    await blink(6, delay);
  }
}
