import {
  CloudFormationCustomResourceHandler,
  CloudFormationCustomResourceResponse,
  CloudFormationCustomResourceResponseCommon,
} from 'aws-lambda';
import axios from 'axios';
import { Telegraf, TelegramError } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);

export const handler: CloudFormationCustomResourceHandler = async (event) => {
  let success = true;
  let reason: string | undefined;
  try {
    await bot.telegram.setWebhook(
      event.RequestType === 'Delete' ? '' : event.ResourceProperties.endpoint,
    );
  } catch (error) {
    success = false;
    reason = (error as TelegramError).message;
  }

  const commonData: CloudFormationCustomResourceResponseCommon = {
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: event.RequestType === 'Create' ? event.RequestId : event.PhysicalResourceId,
    RequestId: event.RequestId,
    StackId: event.StackId,
  };
  let data: CloudFormationCustomResourceResponse;

  if (success) {
    data = {
      ...commonData,
      Status: 'SUCCESS',
    };
  } else {
    data = {
      ...commonData,
      Status: 'FAILED',
      Reason: reason as string,
    };
  }

  await axios.put(event.ResponseURL, data);
};
