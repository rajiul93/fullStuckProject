'use client';

import { useEffect, useState } from 'react';

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [notificationsRes, messagesRes] = await Promise.all([
          fetch('/api/notifications?unread=true'),
          fetch('/api/messages'),
        ]);

        if (!notificationsRes.ok || !messagesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const notificationsData = await notificationsRes.json();
        const messagesData = await messagesRes.json();

        setNotifications(notificationsData);
        setMessages(messagesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications?id=${id}&markRead=true`, {
        method: 'PUT',
      });
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Unread Notifications</h2>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-gray-500">No unread notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    </div>
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Mark as read
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Messages</h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages</p>
            ) : (
              messages.slice(0, 5).map((message) => (
                <div
                  key={message._id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <h3 className="font-semibold">{message.subject}</h3>
                  <p className="text-sm text-gray-600 mt-1">From: {message.name} ({message.email})</p>
                  <p className="text-gray-700 text-sm mt-2">{message.message.substring(0, 100)}...</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
