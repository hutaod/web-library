import { I18nTools, Warkmark, IO, CountryID } from '@al/base-lib';

const resolveI18n = I18nTools.createResolveI18n({
  COOKIE_KEYS_MAP: {
    CountryCode: 'countryCode',
    CountryId: 'countryId',
    LanguageCode: 'languageCode',
    LanguageId: 'languageId',
  },
});

console.log(IO);

const io = new IO({ ctx: { req: undefined, res: undefined }, config: {} });

const wm = new Warkmark();
