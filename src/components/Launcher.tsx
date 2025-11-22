import React from 'react';
import { TitleBar } from './TitleBar';
import { PathSelector } from './PathSelector';
import { ServerInfoCard } from './ServerInfoCard';
import { UsernameInput } from './UsernameInput';
import { ActionButtons } from './ActionButtons';
import { useNotification } from './Notification';
import { useLauncher } from '../hooks/useLauncher';

export const Launcher: React.FC = () => {
  const {
    gtaPath,
    setGtaPath,
    isGTAPathValid,
    username,
    setUsername,
    serverStats,
    modInfo,
    isUpdatingMod,
    isJoining,
    isLoading,
    config,
    handleBrowseGTAPath,
    handleJoinServer,
    handleUpdateMod,
    handleDownloadGTA,
    checkServerStats
  } = useLauncher();

  const { addNotification, NotificationContainer } = useNotification();

  const handleClose = () => {
    if (window.__TAURI__) {
      window.__TAURI__.window.getCurrent().close();
    }
  };

  const handleMinimize = () => {
    if (window.__TAURI__) {
      window.__TAURI__.window.getCurrent().minimize();
    }
  };

  const handleMaximize = () => {
    if (window.__TAURI__) {
      window.__TAURI__.window.getCurrent().toggleMaximize();
    }
  };

  // Show notifications for important events
  React.useEffect(() => {
    if (!isLoading && modInfo?.needs_update) {
      addNotification(
        'warning',
        'Mod Update Tersedia',
        `Versi terbaru mod tersedia. Versi saat ini: ${modInfo.version}`,
        {
          label: 'Update Sekarang',
          onClick: handleUpdateMod
        }
      );
    }
  }, [modInfo, isLoading]);

  React.useEffect(() => {
    if (!isLoading && serverStats?.online === false) {
      addNotification(
        'error',
        'Server Offline',
        'Server sedang tidak dapat diakses. Silakan coba lagi nanti.'
      );
    }
  }, [serverStats, isLoading]);

  return (
    <div className="h-screen bg-bunker flex flex-col">
      <TitleBar
        title="SAMP Launcher Plus"
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
      />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-keppel mb-2">SAMP Launcher Plus</h1>
            <p className="text-gray-400">SA-MP Server Launcher yang elegan dan modern</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <PathSelector
                label="Path GTA San Andreas"
                path={gtaPath}
                isValid={isGTAPathValid}
                onBrowse={handleBrowseGTAPath}
              />

              <UsernameInput
                username={username}
                onChange={setUsername}
              />

              <ActionButtons
                onJoinServer={handleJoinServer}
                onUpdateMod={handleUpdateMod}
                onDownloadGTA={handleDownloadGTA}
                isUpdatingMod={isUpdatingMod}
                hasValidGTAPath={isGTAPathValid}
                isJoining={isJoining}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <ServerInfoCard
                stats={serverStats}
                modInfo={modInfo}
                serverName="Indonesia Roleplay Server"
                serverIp={config.serverIp}
                serverPort={config.serverPort}
                isLoading={isLoading}
              />

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-semibold text-keppel mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={checkServerStats}
                    className="w-full text-left px-3 py-2 rounded-lg bg-spectra/50 hover:bg-spectra/70 transition-colors text-sm text-gray-300"
                  >
                    🔄 Refresh Server Status
                  </button>
                  <button
                    onClick={() => window.open('https://forum.sa-mp.com/', '_blank')}
                    className="w-full text-left px-3 py-2 rounded-lg bg-spectra/50 hover:bg-spectra/70 transition-colors text-sm text-gray-300"
                  >
                    🌐 SA-MP Forums
                  </button>
                  <button
                    onClick={() => window.open('https://www.open.mp/', '_blank')}
                    className="w-full text-left px-3 py-2 rounded-lg bg-spectra/50 hover:bg-spectra/70 transition-colors text-sm text-gray-300"
                    >
                      🎮 Open Multiplayer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-4 border-t border-spectra">
            <p className="text-gray-500 text-sm">
              SAMP Launcher Plus v1.0.0 | Made with ❤️ for SA-MP Community
            </p>
          </div>
        </div>
      </div>

      <NotificationContainer />
    </div>
  );
};