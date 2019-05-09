import * as React from 'react';
import { getNotificationsByAddress } from '../utils/api';
import { normalizeNotifications } from '../utils/notification';
import { INotificationsContext, INotification, IEthereumContext } from '../interfaces/contexts';
import { EthereumContext } from './EthereumProvider';

// prettier-ignore
export const NotificationsContext: React.Context<INotificationsContext> = React.createContext<INotificationsContext>({
  notifications: [],
});

export default function NotificationsProvider(props: any) {
  const [notifications, setNotifications] = React.useState<INotification[]>([]);
  const { account } = React.useContext<IEthereumContext>(EthereumContext);

  /**
   * Handler for getting all notifications for an address
   * and replaces the global notifications state
   * @param address ethereum address of user
   */
  async function getUnreadNotifications(address: string) {
    // fetch notifications from api
    const result: any[] = await getNotificationsByAddress(address);
    // normalize api return data
    const notis: INotification[] = normalizeNotifications(result);
    // set state
    setNotifications(notis);
  }

  // runs whenever account changes
  React.useEffect(() => {
    if (account) {
      getUnreadNotifications(account);
    }
  }, [account]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        onHandleGetUnreadNotifications: getUnreadNotifications,
      }}
    >
      {props.children}
    </NotificationsContext.Provider>
  );
}
