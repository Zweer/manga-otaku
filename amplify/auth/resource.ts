import { defineAuth, secret } from '@aws-amplify/backend';

import { domain } from '../config';

const domains: string[] = [`https://${domain}`, 'http://localhost:3000'];

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('MANGA_OTAKU_GOOGLE_CLIENT_ID'),
        clientSecret: secret('MANGA_OTAKU_GOOGLE_CLIENT_SECRET'),
      },
      callbackUrls: domains,
      logoutUrls: domains,
    },
  },
});
