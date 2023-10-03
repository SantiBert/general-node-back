import * as crypto from 'crypto';

/**
 * @method getRandomInt
 * @param {Number} min Min integer (included).
 * @param {Number} max Max integer (excluded).
 * @return {Number} a random integer between min (included) and max (excluded)
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * @method getRandomString
 * @param {Number} size Number of bytes to generate.
 * @param {Number} enconding The character encoding to use..
 * @return {Number} random string
 */

export function getRandomString(
    size: number,
    enconding: BufferEncoding = 'hex'
  ): string {
    return crypto.randomBytes(size).toString(enconding);
  }