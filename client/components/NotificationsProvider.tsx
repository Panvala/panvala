import * as React from 'react';

export const NotificationsContext = React.createContext({
  notifications: [],
});

export default class NotificationsProvider extends React.PureComponent {
  readonly state: any = {
    notifications: [{ action: 'Welcome to Panvala!' }],
  };

  async componentDidMount() {
    console.log('notifications mounted');
    const noti = {
      action: `Withdraw staked tokens from ${'Panvala Awards Committee'}`,
      text: 'The current batch has ended',
      link: 'Withdraw',
    };
    this.handlePushNotification(noti);
  }

  getUnreadNotifications = async () => {
    const noti = {};
    this.setState({
      notifications: [...this.state.notifications, noti],
    });
  };

  handlePushNotification = (notification: any) => {
    this.setState({
      notifications: [...this.state.notifications, notification],
    });
  };

  render() {
    const { children } = this.props;
    return (
      <NotificationsContext.Provider
        value={{ ...this.state, onHandleNotification: this.handlePushNotification }}
      >
        {children}
      </NotificationsContext.Provider>
    );
  }
}
