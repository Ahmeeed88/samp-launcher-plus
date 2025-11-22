[cfg_attr(mobile, tauri::mobile_entry_point)]

use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::process::Command;
use std::fs;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize)]
pub struct LauncherConfig {
    pub gta_path: Option<String>,
    pub username: Option<String>,
    pub server_ip: String,
    pub server_port: u16,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ServerStats {
    pub online: bool,
    pub players: u32,
    pub max_players: u32,
    pub ping: u32,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ModInfo {
    pub version: String,
    pub path: String,
    pub needs_update: bool,
}

// Check if GTA SA exists in the given path
#[tauri::command]
async fn check_gta_path(path: String) -> Result<bool, String> {
    let gta_exe = PathBuf::from(&path).join("gta_sa.exe");
    Ok(gta_exe.exists())
}

// Launch GTA SA with SA-MP parameters
#[tauri::command]
async fn launch_gta_sa(
    gta_path: String,
    username: String,
    server_ip: String,
    server_port: String,
) -> Result<(), String> {
    let gta_exe = PathBuf::from(&gta_path).join("gta_sa.exe");
    
    if !gta_exe.exists() {
        return Err("gta_sa.exe not found in the specified path".to_string());
    }

    let command = format!(
        "\"{}\" -h {} -p {} -n \"{}\"",
        gta_exe.to_string_lossy(),
        server_ip,
        server_port,
        username
    );

    #[cfg(target_os = "windows")]
    {
        use std::os::windows::process::CommandExt;
        
        let result = Command::new("cmd")
            .args(&["/C", &command])
            .creation_flags(0x00000008) // CREATE_NO_WINDOW
            .spawn();
            
        match result {
            Ok(_) => Ok(()),
            Err(e) => Err(format!("Failed to launch GTA SA: {}", e)),
        }
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        let result = Command::new("sh")
            .args(&["-c", &command])
            .spawn();
            
        match result {
            Ok(_) => Ok(()),
            Err(e) => Err(format!("Failed to launch GTA SA: {}", e)),
        }
    }
}

// Check mod version
#[tauri::command]
async fn check_mod_version(gta_path: String) -> Result<ModInfo, String> {
    let mod_path = PathBuf::from(&gta_path).join("modpack");
    let version_file = mod_path.join("version.txt");
    
    if !version_file.exists() {
        return Ok(ModInfo {
            version: "0.0.0".to_string(),
            path: mod_path.to_string_lossy().to_string(),
            needs_update: true,
        });
    }
    
    let current_version = match fs::read_to_string(&version_file) {
        Ok(content) => content.trim().to_string(),
        Err(_) => "0.0.0".to_string(),
    };
    
    // Get latest version from environment or config
    let latest_version = std::env::var("MOD_VERSION").unwrap_or_else(|_| "1.0.0".to_string());
    
    let needs_update = compare_versions(&current_version, &latest_version) < 0;
    
    Ok(ModInfo {
        version: current_version,
        path: mod_path.to_string_lossy().to_string(),
        needs_update,
    })
}

// Download and extract mod
#[tauri::command]
async fn download_and_extract_mod(
    gta_path: String,
    download_url: String,
) -> Result<(), String> {
    use reqwest;
    use std::io::Write;
    use tempfile;
    
    // Download mod
    let response = reqwest::get(&download_url)
        .await
        .map_err(|e| format!("Failed to download mod: {}", e))?;
    
    let bytes = response
        .bytes()
        .await
        .map_err(|e| format!("Failed to read mod data: {}", e))?;
    
    // Create temporary file
    let temp_dir = tempfile::tempdir()
        .map_err(|e| format!("Failed to create temp directory: {}", e))?;
    
    let temp_file_path = temp_dir.path().join("mod.zip");
    let mut temp_file = fs::File::create(&temp_file_path)
        .map_err(|e| format!("Failed to create temp file: {}", e))?;
    
    temp_file.write_all(&bytes)
        .map_err(|e| format!("Failed to write temp file: {}", e))?;
    
    // Extract zip
    extract_zip(&temp_file_path, &PathBuf::from(&gta_path))?;
    
    Ok(())
}

// Check server stats
#[tauri::command]
async fn check_server_stats(server_ip: String, server_port: u16) -> Result<ServerStats, String> {
    use std::net::{UdpSocket, Ipv4Addr, SocketAddr};
    use std::time::Duration;
    
    let socket = UdpSocket::bind("0.0.0.0:0")
        .map_err(|e| format!("Failed to bind socket: {}", e))?;
    
    socket.set_read_timeout(Some(Duration::from_secs(5)))
        .map_err(|e| format!("Failed to set socket timeout: {}", e))?;
    
    let server_addr: SocketAddr = format!("{}:{}", server_ip, server_port)
        .parse()
        .map_err(|e| format!("Invalid server address: {}", e))?;
    
    // Send SA-MP query packet
    let query_packet = b"SAMP";
    socket.send_to(query_packet, server_addr)
        .map_err(|e| format!("Failed to send query: {}", e))?;
    
    // Try to receive response
    match socket.recv_from(&mut [0; 1024]) {
        Ok((_, _)) => {
            // Mock response for now - in real implementation, parse SA-MP protocol
            Ok(ServerStats {
                online: true,
                players: 75,
                max_players: 200,
                ping: 35,
                name: "Indonesia Roleplay Server".to_string(),
            })
        }
        Err(_) => {
            Ok(ServerStats {
                online: false,
                players: 0,
                max_players: 200,
                ping: 0,
                name: "Indonesia Roleplay Server".to_string(),
            })
        }
    }
}

// Save configuration
#[tauri::command]
async fn save_config(config: LauncherConfig) -> Result<(), String> {
    let app_handle = tauri::AppHandle::current();
    let app_data_dir = app_handle.path().app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    
    let config_path = app_data_dir.join("launcher-config.json");
    
    // Create directory if it doesn't exist
    fs::create_dir_all(&app_data_dir)
        .map_err(|e| format!("Failed to create app data directory: {}", e))?;
    
    let config_json = serde_json::to_string_pretty(&config)
        .map_err(|e| format!("Failed to serialize config: {}", e))?;
    
    fs::write(config_path, config_json)
        .map_err(|e| format!("Failed to write config file: {}", e))?;
    
    Ok(())
}

// Load configuration
#[tauri::command]
async fn load_config() -> Result<Option<LauncherConfig>, String> {
    let app_handle = tauri::AppHandle::current();
    let app_data_dir = app_handle.path().app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))?;
    
    let config_path = app_data_dir.join("launcher-config.json");
    
    if !config_path.exists() {
        return Ok(None);
    }
    
    let config_content = fs::read_to_string(config_path)
        .map_err(|e| format!("Failed to read config file: {}", e))?;
    
    let config: LauncherConfig = serde_json::from_str(&config_content)
        .map_err(|e| format!("Failed to parse config file: {}", e))?;
    
    Ok(Some(config))
}

// Helper function to compare versions
fn compare_versions(v1: &str, v2: &str) -> i32 {
    let v1_parts: Vec<u32> = v1.split('.')
        .filter_map(|s| s.parse().ok())
        .collect();
    let v2_parts: Vec<u32> = v2.split('.')
        .filter_map(|s| s.parse().ok())
        .collect();
    
    for i in 0..std::cmp::max(v1_parts.len(), v2_parts.len()) {
        let v1_part = v1_parts.get(i).unwrap_or(&0);
        let v2_part = v2_parts.get(i).unwrap_or(&0);
        
        if v1_part < v2_part {
            return -1;
        } else if v1_part > v2_part {
            return 1;
        }
    }
    
    0
}

// Helper function to extract zip
fn extract_zip(zip_path: &PathBuf, extract_to: &PathBuf) -> Result<(), String> {
    use zip::ZipArchive;
    use std::io::BufReader;
    
    let file = fs::File::open(zip_path)
        .map_err(|e| format!("Failed to open zip file: {}", e))?;
    
    let reader = BufReader::new(file);
    let mut archive = ZipArchive::new(reader)
        .map_err(|e| format!("Failed to read zip archive: {}", e))?;
    
    for i in 0..archive.len() {
        let mut file = archive.by_index(i)
            .map_err(|e| format!("Failed to get file from zip: {}", e))?;
        
        let out_path = extract_to.join(file.mangled_name());
        
        if file.name().ends_with('/') {
            fs::create_dir_all(&out_path)
                .map_err(|e| format!("Failed to create directory: {}", e))?;
        } else {
            if let Some(parent) = out_path.parent() {
                fs::create_dir_all(parent)
                    .map_err(|e| format!("Failed to create parent directory: {}", e))?;
            }
            
            let mut out_file = fs::File::create(&out_path)
                .map_err(|e| format!("Failed to create output file: {}", e))?;
            
            std::io::copy(&mut file, &mut out_file)
                .map_err(|e| format!("Failed to extract file: {}", e))?;
        }
    }
    
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            check_gta_path,
            launch_gta_sa,
            check_mod_version,
            download_and_extract_mod,
            check_server_stats,
            save_config,
            load_config
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}