import { defineBackend } from '@aws-amplify/backend';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { CustomResource, Stack } from 'aws-cdk-lib';

import { auth } from './auth/resource';
import { projectSlug } from './config';
import { data } from './data/resource';
import { telegramFunction } from './functions/telegram/resource';
import { telegramWebhookFunction } from './functions/telegramWebhook/resource';
import { storage } from './storage/resource';

const backend = defineBackend({
  auth,
  data,
  storage,
  telegramFunction,
  telegramWebhookFunction,
});

const telegramStack = backend.createStack('telegram-stack');

const restApi = new RestApi(telegramStack, 'RestApi', {
  restApiName: projectSlug,
});

const telegramLambdaIntegration = new LambdaIntegration(backend.telegramFunction.resources.lambda);

const telegramPath = 'telegram';
const telegramResource = restApi.root.addResource(telegramPath);
telegramResource.addMethod('POST', telegramLambdaIntegration);

new CustomResource(telegramStack, 'TelegramWebhookCustomResource', {
  serviceToken: backend.telegramWebhookFunction.resources.lambda.functionArn,
  properties: {
    endpoint: restApi.urlForPath(`/${telegramPath}`),
  },
});

backend.addOutput({
  custom: {
    API: {
      [restApi.restApiName]: {
        endpoint: restApi.url,
        region: Stack.of(restApi).region,
        apiName: restApi.restApiName,
      },
    },
  },
});
