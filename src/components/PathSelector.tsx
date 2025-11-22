import React from 'react';
import { Folder, Check, X } from 'lucide-react';

interface PathSelectorProps {
  label: string;
  path: string;
  isValid: boolean;
  onBrowse: () => void;
}

export const PathSelector: React.FC<PathSelectorProps> = ({ label, path, isValid, onBrowse }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={path || 'Belum dipilih...'}
            readOnly
            className={`w-full input-field pr-10 ${isValid ? 'border-green-500/50' : 'border-red-500/50'}`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValid ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
        <button
          onClick={onBrowse}
          className="btn-secondary flex items-center space-x-2"
        >
          <Folder className="w-4 h-4" />
          <span>Browse</span>
        </button>
      </div>
    </div>
  );
};