// src/components/NotificationBanner.jsx
import React from 'react';

export default function NotificationBanner({ type = 'info', message }) {
  const bgColor = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }[type] || 'bg-gray-100 border-gray-400 text-gray-700';

  return (
    <div className={`p-3 mb-4 border-l-4 ${bgColor} rounded`}>
      {message}
    </div>
  );
}