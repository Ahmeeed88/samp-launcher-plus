export interface ServerConfig {
  ip: string;
  port: number;
  name: string;
}

export interface ModInfo {
  version: string;
  path: string;
  needsUpdate: boolean;
}

export interface ServerStats {
  online: boolean;
  players: number;
  maxPlayers: number;
  ping: number;
  name: string;
}

export interface LauncherConfig {
  gtaPath: string;
  username: string;
  server: ServerConfig;
  mod: ModInfo;
}