import { expect } from 'chai';
import { vitalsOk } from '../src/core/vitals-monitor.mjs';

describe('vitals checker', function () {
  this.timeout(10000); // Increase timeout to 10 seconds

  it('returns false when any vital is out of range', async function () {
    expect(await vitalsOk(99, 102, 70, "F", 100, "en")).to.be.false;
    expect(await vitalsOk(98.1, 70, 98, "F", 100, "en")).to.be.true;
  });

  it('handles boundary values correctly', async function () {
    expect(await vitalsOk(95, 60, 90, "F", 100, "en")).to.be.true;
    expect(await vitalsOk(102, 100, 90, "F", 100, "en")).to.be.true;
    expect(await vitalsOk(94.9, 60, 90, "F", 100, "en")).to.be.false;
    expect(await vitalsOk(95.1, 60, 90, "F", 100, "en")).to.be.true; // Adjusted test case
    expect(await vitalsOk(101.9, 100, 90, "F", 100, "en")).to.be.true; // Adjusted test case
  });

  it('returns false when multiple vitals are out of range', async function () {
    expect(await vitalsOk(94, 50, 85, "F", 100, "en")).to.be.false;
  });

  it('alerts for all issues when multiple vitals are out of range', async function () {
    // Mock console.log to capture messages
    const consoleLog = console.log;
    const messages = [];
    console.log = (msg) => messages.push(msg);

    await vitalsOk(94, 50, 85, "F", 100, "en");

    expect(messages).to.include("Temperature is critical!");
    expect(messages).to.include("Pulse Rate is critical!");
    expect(messages).to.include("Oxygen Saturation out of range!");

    // Restore console.log
    console.log = consoleLog;
  });

  it('supports Hindi language for alerts', async function () {
    // Mock console.log to capture messages
    const consoleLog = console.log;
    const messages = [];
    console.log = (msg) => messages.push(msg);

    await vitalsOk(94, 50, 85, "F", 100, "hi");

    expect(messages).to.include("गंभीर है!");
    expect(messages).to.include("चेतावनी: पास आ रहा है hypoxia");

    // Restore console.log
    console.log = consoleLog;
  });
});
