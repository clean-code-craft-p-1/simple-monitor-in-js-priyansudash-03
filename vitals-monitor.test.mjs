import { expect } from 'chai';
import { vitalsOk } from './vitals-monitor.mjs';

describe('vitals checker', function () {
  this.timeout(10000); // Increase timeout to 10 seconds

  it('returns false when any vital is out of range', async function () {
    expect(await vitalsOk(99, 102, 70, true)).to.be.false; // Pass true for testMode
    expect(await vitalsOk(98.1, 70, 98, true)).to.be.true;
  });

  it('handles boundary values correctly', async function () {
    expect(await vitalsOk(95, 60, 90, true)).to.be.true;
    expect(await vitalsOk(102, 100, 90, true)).to.be.true;
    expect(await vitalsOk(94.9, 60, 90, true)).to.be.false;
    expect(await vitalsOk(95, 59.9, 90, true)).to.be.false;
    expect(await vitalsOk(95, 60, 89.9, true)).to.be.false;
  });

  it('returns false when multiple vitals are out of range', async function () {
    expect(await vitalsOk(94, 50, 85, true)).to.be.false;
  });

  it('alerts for all issues when multiple vitals are out of range', async function () {
    // Mock console.log to capture messages
    const consoleLog = console.log;
    const messages = [];
    console.log = (msg) => messages.push(msg);

    await vitalsOk(94, 50, 85, true);

    expect(messages).to.include("Temperature is critical!");
    expect(messages).to.include("Pulse Rate is out of range!");
    expect(messages).to.include("Oxygen Saturation out of range!");

    // Restore console.log
    console.log = consoleLog;
  });
});
