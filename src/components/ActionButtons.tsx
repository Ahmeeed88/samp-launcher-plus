import React from 'react';
import { Download, RefreshCw, Play } from 'lucide-react';

interface ActionButtonsProps {
  onJoinServer: () => void;
  onUpdateMod: () => void;
  onDownloadGTA: () => void;
  isUpdatingMod: boolean;
  hasValidGTAPath: boolean;
  isJoining: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onJoinServer,
  onUpdateMod,
  onDownloadGTA,
  isUpdatingMod,
  hasValidGTAPath,
  isJoining
}) => {
  return (
    <div className="space-y-3">
      <button
        onClick={onJoinServer}
        disabled={!hasValidGTAPath || isJoining}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isJoining ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Memulai...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span>Join Server</span>
          </>
        )}
      </button>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onUpdateMod}
          disabled={isUpdatingMod}
          className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdatingMod ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Update Mod</span>
            </>
          )}
        </button>
        
        <button
          onClick={onDownloadGTA}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download GTA</span>
        </button>
      </div>
    </div>
  );
};