import { Module } from '@nestjs/common';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';

export const i18nModuleRegister = I18nModule.forRoot({
  fallbackLanguage: 'en',
  loaderOptions: {
    path: path.join(__dirname, '../../../../core/i18n'),
    watch: true,
  },
  resolvers: [
    { use: AcceptLanguageResolver, options: { matchType: 'strict-loose' } },
  ],
});
