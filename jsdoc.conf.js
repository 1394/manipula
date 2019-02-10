'use strict';

module.exports = {
  plugins: [
    'plugins/markdown',
    'plugins/summarize',
  ],
  source: {
    include: ['index.js', 'object.js', 'array.js', './README.md']
  },
  sourceType: 'module',
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure'],
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
  },
  opts: {
    destination: './docs',
  },
};
