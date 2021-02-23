import { I18nTools, Logger, IO } from '@al/base-lib';

const resolveI18n = I18nTools.createResolveI18n({
  COOKIE_KEYS_MAP: {
    CountryCode: 'countryCode',
    CountryId: 'countryId',
    LanguageCode: 'languageCode',
    LanguageId: 'languageId',
  },
});

console.log(IO);

const io = new IO({ ctx: {} });

const sum = function (a: number, b: number): number {
  return a + b;
};
console.log(sum(1, 2));

export default sum;
