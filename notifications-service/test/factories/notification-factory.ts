import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { Content } from '@applicationentities/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Nova solicitação de amizade'),
    category: 'social',
    recipientId: 'example-recipient-id',
    ...override,
  });
}
