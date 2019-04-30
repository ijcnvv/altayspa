/** *
 * @param count
 * @param word
 * @param one - ending for one item
 * @param two - ending for two items
 * @param five - ending for five items
 * @returns {string}
 */
export default function (count, word, one = '', two = 'а', five = 'ов') {

  const num = count % 100;
  const last = +count.toString().slice(-1);

  if ((num > 4 && num < 21) || num === 0) {
    return `${word}${five}`;
  } else  if (last > 1 && last < 5) {
    return `${word}${two}`;
  } else if (last === 1) {
    return `${word}${one}`;
  }
  
  return `${word}${five}`;
};

