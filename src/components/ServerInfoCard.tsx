import React from 'react';
import { Users, Activity, Wifi, WifiOff, Package, Download } from 'lucide-react';
import { ServerStats, ModInfo } from '../types';

interface ServerInfoCardProps {
  stats: ServerStats | null;
  modInfo: ModInfo | null;
  serverName: string;
  serverIp: string;
  serverPort: number;
  isLoading?: boolean;
}

export const ServerInfoCard: React.FC<ServerInfoCardProps> = ({ 
  stats, 
  modInfo,
  serverName, 
  serverIp, 
  serverPort,
  isLoading = false
}) => {
  const getServerStatusColor = () => {
    if (isLoading) return 'text-gray-500';
    return stats?.online ? 'text-green-500' : 'text-red-500';
  };

  const getServerStatusText = () => {
    if (isLoading) return 'Checking...';
    return stats?.online ? 'Online' : 'Offline';
  };

  const getModStatusColor = () => {
    if (!modInfo) return 'text-gray-500';
    return modInfo.needs_update ? 'text-yellow-500' : 'text-green-500';
  };

  const getModStatusText = () => {
    if (!modInfo) return 'Unknown';
    return modInfo.needs_update ? 'Update Available' : 'Up to Date';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-keppel">Informasi Server</h3>
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <Activity className="w-4 h-4 text-gray-500 animate-spin" />
          ) : stats?.online ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${getServerStatusColor()}`}>
            {getServerStatusText()}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Server Name</span>
          <span className="text-gray-100 font-medium text-right max-w-[200px] truncate">
            {serverName}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Address</span>
          <span className="text-gray-100 font-medium">{serverIp}:{serverPort}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Players</span>
          </div>
          <span className="text-gray-100 font-medium">
            {isLoading ? 'Checking...' : `${stats?.players || 0}/${stats?.max_players || 200}`}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Ping</span>
          </div>
          <span className="text-gray-100 font-medium">
            {isLoading ? 'Checking...' : `${stats?.ping || 0}ms`}
          </span>
        </div>

        <div className="border-t border-spectra pt-3 mt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Mod Version</span>
            </div>
            <span className="text-gray-100 font-medium text-sm">
              {modInfo?.version || 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Mod Status</span>
            </div>
            <span className={`text-sm font-medium ${getModStatusColor()}`}>
              {getModStatusText()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};