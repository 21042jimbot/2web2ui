import _ from 'lodash';
import { newlineStrRegex, spacesRegex } from './regex';

export function snakeToFriendly(string = '') {
  return string
    .charAt(0).toUpperCase() + string.slice(1)
    .replace(/(_\w)/g, (matches) => ` ${matches[1].toUpperCase()}`);
}

export const slugify = (value = '') => (
  value
    .replace(/([a-z])([A-Z])/g, '$1-$2') // exampleValue to example-value
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '') // remove invalid
    .replace(/^-|-$/g, '') //remove leading or trailing dash
);

export const slugToFriendly = (string = '') => (
  string
    .charAt(0).toUpperCase() + string.slice(1)
    .replace(/[_-]+/g, '-') // replace groups of underscores or hyphens with single hyphen
    .replace(/(-\w)/g, (matches) => ` ${matches[1].toUpperCase()}`)
);

export function snakeToCamel(string) {
  return string.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
}

/**
 * Replace characters from the middle of a string with an ellipsis to make it
 * fit a given length.
 *
 * e.g. 'supercalafragilisticexpialidocious' -> 'super...ocious'
 *
 * @param {String} string - string to shorten
 * @param {Number} maxLen - final string length
 */
export function shrinkToFit(string, targetLen) {
  const len = string.length;
  const chunkLen = (targetLen - 3) / 2;

  if (len <= targetLen || targetLen < 3) {
    return string;
  }

  return `${string.slice(0, chunkLen)}...${string.slice(len - chunkLen)}`;
}

/**
 * Converts a comma separated string into an array
 */
export const stringToArray = (str, delimiter = ',') => (
  str.split(delimiter)
    .map((part) => part.trim())
    .filter(Boolean)
);

// Split a string by newlines then a delimiter
export const multilineStringToArray = (str, delimiter) => (
  _.flatMap(
    stringToArray(str, '\n')
      .map((part) => stringToArray(part, delimiter))
  )
);

export function stringifyTypeaheadfilter(filter) {
  const subaccount = filter.type === 'Subaccount' ? `:${filter.id}` : '';
  return `${filter.type}:${filter.value}${subaccount}`;
}

// @see why we don't use regex to remove tags, https://stackoverflow.com/a/1732454
export function stripTags(html) {
  const div = document.createElement('div');
  const space = ' ';

  div.innerHTML = html;

  // innerText handles spacing much better than textContent, specifically line breaks are replaced
  // with spaces instead of completely removed
  return (div.innerText || div.textContent || '')
    .replace(newlineStrRegex, space) // extra credit since html could have newlines
    .replace(spacesRegex, space) // avoid multiple spaces between words
    .trim();
}

export function decodeBase64(str) {
  try {
    return atob(str);
  } catch (e) {
    return undefined; // ignore parsing error
  }
}

export function trimWhitespaces(str = '') {
  return str.trim();
}

export const tagAsCopy = (str) => {
  const copyRegex = / Copy( \d+)?$/;
  const matches = copyRegex.exec(str);

  if (matches === null) {
    return `${str} Copy`;
  }

  const count = parseInt(matches[1] || 1);
  return str.replace(copyRegex, ` Copy ${count + 1}`);
};

export const pluralString = (count, singularLabel, pluralLabel) => `${count} ${count === 1 ? singularLabel : pluralLabel || `${singularLabel}s`}`;
