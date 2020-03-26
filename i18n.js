/** @format */

const NextI18Next = require('next-i18next').default;

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['vi']
});

module.exports = NextI18NextInstance;

/* Optionally, export class methods as named exports */
module.exports = { appWithTranslation, withTranslation } = NextI18NextInstance;
