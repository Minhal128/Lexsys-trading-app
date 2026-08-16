// Hardcoded notification service - no backend required
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Welcome to Lexsys",
    message: "Your account has been successfully created. Start trading now!",
    type: "info",
    read: false,
    timestamp: "2024-01-15T10:30:00Z",
    category: "account"
  },
  {
    id: 2,
    title: "Order Executed",
    message: "Your BTC/USD buy order for 0.1 BTC at $49,500 has been executed successfully.",
    type: "success",
    read: false,
    timestamp: "2024-01-15T10:30:00Z",
    category: "trading"
  },
  {
    id: 3,
    title: "Price Alert",
    message: "ETH/USD has reached your target price of $2,000. Consider reviewing your position.",
    type: "warning",
    read: true,
    timestamp: "2024-01-15T09:15:00Z",
    category: "alert"
  },
  {
    id: 4,
    title: "Margin Call Warning",
    message: "Your margin utilization is at 85%. Please add funds or reduce positions.",
    type: "error",
    read: false,
    timestamp: "2024-01-14T16:45:00Z",
    category: "risk"
  },
  {
    id: 5,
    title: "Market Update",
    message: "Cryptocurrency markets are experiencing high volatility. Trade with caution.",
    type: "info",
    read: true,
    timestamp: "2024-01-14T14:20:00Z",
    category: "market"
  },
  {
    id: 6,
    title: "Position Closed",
    message: "Your ADA/USD position has been automatically closed due to stop loss trigger.",
    type: "warning",
    read: false,
    timestamp: "2024-01-14T12:10:00Z",
    category: "trading"
  }
];

export const notificationService = {
  async getNotifications() {
    console.log('Mock getNotifications');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Sort by timestamp (newest first)
    const sortedNotifications = [...MOCK_NOTIFICATIONS].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    return {
      success: true,
      data: sortedNotifications
    };
  },

  async getUnreadCount() {
    console.log('Mock getUnreadCount');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const unreadCount = MOCK_NOTIFICATIONS.filter(notif => !notif.read).length;
    
    return {
      success: true,
      data: {
        unreadCount: unreadCount,
        totalCount: MOCK_NOTIFICATIONS.length
      }
    };
  },

  async markAsRead(id) {
    console.log('Mock markAsRead:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const notification = MOCK_NOTIFICATIONS.find(notif => notif.id === parseInt(id));
    
    if (notification) {
      notification.read = true;
      return {
        success: true,
        data: {
          message: 'Notification marked as read',
          notification: notification
        }
      };
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Notification not found' }
    };
  },

  async markAllAsRead() {
    console.log('Mock markAllAsRead');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const unreadNotifications = MOCK_NOTIFICATIONS.filter(notif => !notif.read);
    
    unreadNotifications.forEach(notif => {
      notif.read = true;
    });
    
    return {
      success: true,
      data: {
        message: `${unreadNotifications.length} notifications marked as read`,
        markedCount: unreadNotifications.length
      }
    };
  },

  async deleteNotification(id) {
    console.log('Mock deleteNotification:', id);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const notificationIndex = MOCK_NOTIFICATIONS.findIndex(notif => notif.id === parseInt(id));
    
    if (notificationIndex !== -1) {
      const deletedNotification = MOCK_NOTIFICATIONS.splice(notificationIndex, 1)[0];
      return {
        success: true,
        data: {
          message: 'Notification deleted successfully',
          deletedNotification: deletedNotification
        }
      };
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Notification not found' }
    };
  },
};

export default notificationService;
