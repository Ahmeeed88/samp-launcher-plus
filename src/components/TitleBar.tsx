import React from 'react';
import { X, Minus, Square } from 'lucide-react';

interface TitleBarProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ title, onClose, onMinimize, onMaximize }) => {
  return (
    <div className="flex items-center justify-between h-8 bg-gable-green px-4 select-none drag-region">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors cursor-pointer no-drag" onClick={onClose} />
        <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer no-drag" onClick={onMinimize} />
        <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors cursor-pointer no-drag" onClick={onMaximize} />
      </div>
      <div className="text-gray-300 text-sm font-medium">{title}</div>
      <div className="w-16" />
    </div>
  );
};