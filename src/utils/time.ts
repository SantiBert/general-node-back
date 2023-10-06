import {DateTime} from 'luxon';
const {getNetworkTime} = require('@destinationstransfers/ntp');

export function dateToEpoch(date: DateTime): number {
    const MILLISECONDS_IN_SECOND = 1000;
    return Math.floor(date.valueOf() / MILLISECONDS_IN_SECOND);
  }

export function getDiferentialFromNow(dateTime: Date): number {
    return Math.floor(Date.now() / 1000) - dateToEpoch(dateTime);
  }

export function getISONow(): DateTime {
  return DateTime.now().toISO();
}

export async function getUniversalTime(): Promise<number | null> {
  try {
    const MILLISECONDS_IN_SECOND = 1000;
    return Math.floor(
      new Date(await getNetworkTime()).getTime() / MILLISECONDS_IN_SECOND
    );
  } catch (err) {
    console.error(`getNetworktime error: ${err}`);
    return null;
  }
}