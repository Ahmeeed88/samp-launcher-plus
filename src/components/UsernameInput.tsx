import React from 'react';
import { User } from 'lucide-react';

interface UsernameInputProps {
  username: string;
  onChange: (username: string) => void;
  placeholder?: string;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({ 
  username, 
  onChange, 
  placeholder = "Masukkan username SA-MP" 
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">Username SA-MP</label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={username}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full input-field pl-10"
          maxLength={24}
        />
      </div>
      <p className="text-xs text-gray-500">
        {username.length}/24 karakter
      </p>
    </div>
  );
};