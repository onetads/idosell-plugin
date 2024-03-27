import { messagesMap } from 'consts/messages';

const widgetName = 'Onet Ads IdoSell';

const getMessage = (msgKey: keyof typeof messagesMap) => {
  return `${widgetName} - ${messagesMap[msgKey]}`;
};

export default getMessage;
