import { useState, useEffect } from 'react';
import { ServerStats, LauncherConfig, ModInfo } from '../types';

export const useLauncher = () => {
  const [gtaPath, setGtaPath] = useState<string>('');
  const [isGTAPathValid, setIsGTAPathValid] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [serverStats, setServerStats] = useState<ServerStats | null>(null);
  const [modInfo, setModInfo] = useState<ModInfo | null>(null);
  const [isUpdatingMod, setIsUpdatingMod] = useState<boolean>(false);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Configuration from environment
  const config = {
    serverIp: process.env.SERVER_IP || '192.168.1.100',
    serverPort: parseInt(process.env.SERVER_PORT || '7777'),
    modDownloadLink: process.env.MOD_DOWNLOAD_LINK || '',
    gtaDownloadLink: process.env.GTA_DOWNLOAD_LINK || '',
    autoUpdateMod: process.env.AUTO_UPDATE_MOD === 'true'
  };

  // Load configuration on mount
  useEffect(() => {
    initializeLauncher();
  }, []);

  // Auto-check mod updates
  useEffect(() => {
    if (isGTAPathValid && config.autoUpdateMod && modInfo?.needs_update) {
      // Show update notification after 2 seconds
      const timer = setTimeout(() => {
        const shouldUpdate = window.confirm(
          'Mod baru tersedia! Apakah Anda ingin mengunduh dan memasangnya sekarang?'
        );
        if (shouldUpdate) {
          handleUpdateMod();
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isGTAPathValid, modInfo, config.autoUpdateMod]);

  const initializeLauncher = async () => {
    try {
      await loadConfiguration();
      await checkServerStats();
      
      if (gtaPath) {
        await validateGTAPath(gtaPath);
        await checkModVersion();
      }
    } catch (error) {
      console.error('Failed to initialize launcher:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadConfiguration = async () => {
    try {
      if (window.__TAURI__) {
        const { invoke } = window.__TAURI__.core;
        const config = await invoke<LauncherConfig | null>('load_config');
        
        if (config) {
          setGtaPath(config.gta_path || '');
          setUsername(config.username || '');
        }
      }
    } catch (error) {
      console.error('Failed to load configuration:', error);
    }
  };

  const saveConfiguration = async () => {
    try {
      if (window.__TAURI__) {
        const { invoke } = window.__TAURI__.core;
        const launcherConfig: LauncherConfig = {
          gta_path: gtaPath,
          username: username,
          server_ip: config.serverIp,
          server_port: config.serverPort,
        };
        
        await invoke('save_config', { config: launcherConfig });
      }
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  };

  const validateGTAPath = async (path: string): Promise<boolean> => {
    try {
      if (window.__TAURI__) {
        const { invoke } = window.__TAURI__.core;
        const isValid = await invoke<boolean>('check_gta_path', { path });
        setIsGTAPathValid(isValid);
        return isValid;
      }
      return false;
    } catch (error) {
      console.error('Failed to validate GTA path:', error);
      setIsGTAPathValid(false);
      return false;
    }
  };

  const checkModVersion = async () => {
    try {
      if (window.__TAURI__ && gtaPath) {
        const { invoke } = window.__TAURI__.core;
        const modInfo = await invoke<ModInfo>('check_mod_version', { gtaPath });
        setModInfo(modInfo);
      }
    } catch (error) {
      console.error('Failed to check mod version:', error);
    }
  };

  const handleBrowseGTAPath = async () => {
    try {
      if (window.__TAURI__) {
        const { open } = window.__TAURI__.dialog;
        const selected = await open({
          directory: true,
          title: 'Pilih Folder GTA San Andreas'
        });
        
        if (selected && typeof selected === 'string') {
          setGtaPath(selected);
          const isValid = await validateGTAPath(selected);
          
          if (!isValid) {
            alert('Folder yang dipilih tidak berisi file gta_sa.exe!');
          } else {
            await saveConfiguration();
            await checkModVersion();
          }
        }
      }
    } catch (error) {
      console.error('Failed to browse GTA path:', error);
      alert('Gagal memilih folder. Silakan coba lagi.');
    }
  };

  const checkServerStats = async () => {
    try {
      if (window.__TAURI__) {
        const { invoke } = window.__TAURI__.core;
        const stats = await invoke<ServerStats>('check_server_stats', {
          serverIp: config.serverIp,
          serverPort: config.serverPort,
        });
        setServerStats(stats);
      } else {
        // Mock stats for development
        const mockStats: ServerStats = {
          online: Math.random() > 0.1,
          players: Math.floor(Math.random() * 100) + 50,
          max_players: 200,
          ping: Math.floor(Math.random() * 50) + 10,
          name: "Indonesia Roleplay Server"
        };
        setServerStats(mockStats);
      }
    } catch (error) {
      console.error('Failed to check server stats:', error);
      setServerStats({
        online: false,
        players: 0,
        max_players: 200,
        ping: 0,
        name: "Indonesia Roleplay Server"
      });
    }
  };

  const handleJoinServer = async () => {
    if (!isGTAPathValid) {
      alert('Silakan pilih path GTA San Andreas yang valid terlebih dahulu!');
      return;
    }

    if (!username.trim()) {
      alert('Silakan masukkan username terlebih dahulu!');
      return;
    }

    if (username.length > 24) {
      alert('Username maksimal 24 karakter!');
      return;
    }

    try {
      setIsJoining(true);
      await saveConfiguration();

      if (window.__TAURI__) {
        const { invoke } = window.__TAURI__.core;
        await invoke('launch_gta_sa', {
          gtaPath,
          username,
          serverIp: config.serverIp,
          serverPort: config.serverPort.toString(),
        });
      }
    } catch (error) {
      console.error('Failed to join server:', error);
      alert('Gagal memulai game. Pastikan GTA SA terinstall dengan benar.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleUpdateMod = async () => {
    if (!isGTAPathValid) {
      alert('Silakan pilih path GTA San Andreas yang valid terlebih dahulu!');
      return;
    }

    if (!config.modDownloadLink) {
      alert('Link download mod tidak tersedia!');
      return;
    }

    try {
      setIsUpdatingMod(true);
      
      if (window.__TAURI__) {
        const { invoke } = window.__TAURI__.core;
        await invoke('download_and_extract_mod', {
          gtaPath,
          downloadUrl: config.modDownloadLink,
        });
        
        alert('Mod berhasil diperbarui! Silakan restart launcher.');
        await checkModVersion();
      } else {
        // Mock update process for development
        await new Promise(resolve => setTimeout(resolve, 3000));
        alert('Mod berhasil diperbarui! (Mock)');
        await checkModVersion();
      }
    } catch (error) {
      console.error('Failed to update mod:', error);
      alert('Gagal memperbarui mod. Silakan coba lagi atau download manual.');
    } finally {
      setIsUpdatingMod(false);
    }
  };

  const handleDownloadGTA = () => {
    if (config.gtaDownloadLink) {
      if (window.__TAURI__) {
        const { open } = window.__TAURI__.shell;
        open(config.gtaDownloadLink);
      } else {
        window.open(config.gtaDownloadLink, '_blank');
      }
    } else {
      alert('Link download GTA SA tidak tersedia!');
    }
  };

  // Auto-refresh server stats
  useEffect(() => {
    const interval = setInterval(checkServerStats, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return {
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
    checkServerStats,
    saveConfiguration,
  };
};