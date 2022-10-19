/* eslint-disable no-unused-expressions */
/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const baseFontSize = 16;

const breakpoints = {
  sm: {
    width: "rem(320)",
    columns: 4,
    margin: "0"
  },
  md: {
    width: "rem(672)",
    columns: 8,
    margin: "rem(16)"
  },
  lg: {
    width: "rem(1056)",
    columns: 16,
    margin: "rem(16)"
  },
  xlg: {
    width: "rem(1312)",
    columns: 16,
    margin: "rem(16)"
  },
  max: {
    width: "rem(1584)",
    columns: 16,
    margin: "rem(24)"
  }
};

/**
 * Utility that sets an array of elements to the same height.
 *
 * @example
 * import {sameHeight} from '@carbon/ibmdotcom-utilities';
 *
 * sameHeight(ElementArray, 'md');
 *
 * if you want the utility to refresh the sizes as you resize the screen, consider using a listener:
 *
 * window.addEventListener('resize', function() {
 *   window.requestAnimationFrame(function() {
 *     sameHeight(ElementArray, 'md');
 *   });
 * }, true);
 *
 * @param {Array} elemCollection Html objects array
 * @param {string} minSize Minimum size for the utility to be activated, empty for small,
 *  md for medium, lg for large, xlg for xlarge, max for maximum
 */
function sameHeight(elemCollection, minSize = false) {
  const elemArr = Array.prototype.slice.call(elemCollection);
  const targetWidth = minSize ? parseFloat(breakpoints[minSize].width) * baseFontSize : 0;
  if (window.innerWidth > targetWidth) {
    let targetHeight = 0;
    elemArr.forEach((elem) => {
      elem.style.height = "auto";
      elem.offsetHeight > targetHeight ? (targetHeight = elem.clientHeight) : false;
    });

    elemArr.forEach((elem) => {
      elem.style.height = `${targetHeight}px`;
    });
  } else {
    elemArr.forEach((elem) => {
      elem.style.height = "auto";
    });
  }
}

export default sameHeight;
