import {DateTime} from 'luxon';

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