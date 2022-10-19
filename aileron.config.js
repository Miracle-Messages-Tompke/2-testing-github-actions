/* eslint-disable no-undef */

/** @type {import('@aileron/styles').Config} */
module.exports = {
  content: [".storybook/docs/styles/**/*.stories.mdx"],
  safelist: [
    {
      pattern: /\/*.+/,
      variants: ['disabled', 'hover', 'focus', 'sm', 'md', 'lg', 'xs', 'supports-scrollbars'],
    }
  ]
};
