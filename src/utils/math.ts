/**
 * @method getRandomInt
 * @param {Number} min Min integer (included).
 * @param {Number} max Max integer (excluded).
 * @return {Number} a random integer between min (included) and max (excluded)
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}