import React, { useState } from 'react';
import { X, Check, AlertCircle, Download } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  onClose,
  action
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Download className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/50';
      case 'error':
        return 'border-red-500/50';
      case 'warning':
        return 'border-yellow-500/50';
      case 'info':
        return 'border-blue-500/50';
      default:
        return 'border-spectra';
    }
  };

  return (
    <div className={`fixed top-4 right-4 w-96 bg-timber-green rounded-lg shadow-elegant border ${getBorderColor()} p-4 z-50 animate-in slide-in-from-right duration-300`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-100">{title}</h4>
          <p className="text-sm text-gray-400 mt-1">{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-3 text-sm text-keppel hover:text-paradiso font-medium transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  }>>([]);

  const addNotification = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    action?: {
      label: string;
      onClick: () => void;
    }
  ) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, title, message, action }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const NotificationContainer = () => (
    <>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
          action={notification.action}
        />
      ))}
    </>
  );

  return { addNotification, NotificationContainer };
};