# SAMP Launcher Plus

![SAMP Launcher Plus](https://img.shields.io/badge/SAMP-Launcher%20Plus-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows-lightgrey?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

🎮 **SAMP Launcher Plus** - Aplikasi desktop launcher untuk SA-MP (San Andreas Multiplayer) yang elegan dan modern dengan fitur auto-update mod dan monitoring server real-time.

## 🚀 **Quick Download & Install**

### **Option 1: Download ZIP (Recommended)**
1. Klik tombol hijau **"Code"** di atas
2. Pilih **"Download ZIP"**
3. Extract file ZIP ke folder Anda
4. Ikuti instruksi instalasi di bawah

### **Option 2: Clone Repository**
```bash
git clone https://github.com/yourusername/samp-launcher-plus.git
cd samp-launcher-plus
```

## 📦 **Cara Install & Build**

### **Prerequisites**
- Windows 10/11
- Node.js 18+ 
- Rust 1.70+ (untuk build)

### **Installation Steps**
```bash
# 1. Install dependencies
npm install

# 2. Build aplikasi
npm run tauri build

# 3. Installer akan ada di:
# src-tauri/target/release/bundle/msi/
```

### **Development Mode**
```bash
# Untuk development/testing
npm run tauri dev
```

## 🎯 **Features Lengkap**

### ✅ **Core Features**
- **Modern UI** - Dark theme elegan dengan animasi smooth
- **Smart Path Detection** - Auto-deteksi folder GTA San Andreas
- **Real-time Server Monitoring** - Live stats (players, ping, status)
- **Auto-Update System** - One-click mod update dengan progress
- **Configuration Manager** - Save/load settings otomatis

### ✅ **Technical Features**
- **Rust Backend** - Native performance & security
- **React Frontend** - Modern UI dengan TypeScript
- **Cross-Platform** - Windows ready (Linux/macOS extensible)
- **Small Size** - ~15MB installer
- **No Dependencies** - Standalone executable

## 📸 **Tampilan Aplikasi**

```
┌─────────────────────────────────────────────────────────────┐
│ ◼ ● ◭  SAMP Launcher Plus                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🎮 SAMP Launcher Plus                                      │
│  SA-MP Server Launcher yang elegan dan modern               │
│                                                             │
│  ┌─────────────────────┐  ┌───────────────────────────────┐ │
│  │ 📁 GTA SA Path      │  │ 📊 Server Information         │ │
│  │ C:\Games\GTA SA     │  │ ● Online                      │ │
│  │ [✓] Valid           │  │ Indonesia Roleplay Server     │ │
│  │                     │  │ 192.168.1.100:7777            │ │
│  │ 👤 Username         │  │ 👥 75/200 players             │ │
│  │ [YourUsername____] │  │ 🏓 35ms ping                  │ │
│  │                     │  │                               │ │
│  │ [🚀 Join Server]    │  │ 📦 Mod v1.2.3                 │ │
│  │                     │  │ 🔄 Update Available            │ │
│  │ [🔄 Update Mod] [📥] │  └───────────────────────────────┘ │
│  └─────────────────────┘                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## ⚙️ **Konfigurasi**

### **Environment Variables**
Buat file `.env`:
```env
# Server Configuration
SERVER_IP=192.168.1.100
SERVER_PORT=7777

# Download Links
GTA_DOWNLOAD_LINK=https://example.com/gta-san-andreas.zip
MOD_DOWNLOAD_LINK=https://example.com/modpack.zip

# Mod Configuration
MOD_VERSION=1.2.3
AUTO_UPDATE_MOD=true
```

### **Runtime Config**
Settings otomatis disimpan di:
- **Windows**: `%APPDATA%/com.samplauncher.plus/launcher-config.json`

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** dengan TypeScript
- **Tailwind CSS** untuk styling elegan
- **Lucide React** untuk modern icons
- **Vite** untuk fast builds

### **Backend**
- **Rust** dengan Tauri framework
- **reqwest** untuk HTTP operations
- **zip** untuk file extraction
- **serde** untuk JSON serialization

## 🎮 **Cara Penggunaan**

### **First Time Setup**
1. Launch "SAMP Launcher Plus"
2. Klik "Browse" pilih folder GTA San Andreas
3. Masukkan username SA-MP
4. Klik "Join Server"

### **Daily Usage**
- Launcher auto-load settings
- Real-time server monitoring
- Quick access ke semua actions
- Background mod update checks

## 📁 **Struktur Project**

```
samp-launcher-plus/
├── 📁 src/                     # React frontend
│   ├── components/              # UI components
│   │   ├── Launcher.tsx        # Main interface
│   │   ├── TitleBar.tsx        # Custom title bar
│   │   ├── PathSelector.tsx    # GTA path browser
│   │   ├── ServerInfoCard.tsx  # Server stats
│   │   ├── UsernameInput.tsx   # Username field
│   │   ├── ActionButtons.tsx   # Main buttons
│   │   └── Notification.tsx    # Alert system
│   ├── hooks/
│   │   └── useLauncher.ts      # Main logic
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── main.tsx                # App entry
│   └── index.css               # Tailwind styles
├── 📁 src-tauri/               # Rust backend
│   ├── src/
│   │   ├── main.rs             # Entry point
│   │   └── lib.rs              # Core logic
│   ├── Cargo.toml              # Rust deps
│   └── tauri.conf.json         # Config
├── 📄 package.json              # Node.js deps
├── 📄 README.md                 # This file
└── 📄 LICENSE                   # MIT License
```

## 🔧 **Build Commands**

```bash
# Development
npm run tauri dev

# Production Build
npm run tauri build

# Platform-specific
npm run tauri build -- --target x86_64-pc-windows-msvc
```

## 🐛 **Troubleshooting**

### **Common Issues**
- **"gta_sa.exe not found"** → Pilih folder GTA SA yang benar
- **"Failed to launch game"** → Run as Administrator
- **"Server offline"** → Cek koneksi internet
- **"Mod update failed"** → Cek disk space & internet

## 📄 **License**

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 **Credits**

- [SA-MP Team](https://sa-mp.com/) - San Andreas Multiplayer
- [Tauri](https://tauri.app/) - Rust app framework  
- [React](https://reactjs.org/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

## 🎯 **Download Sekarang!**

**Klik "Code" → "Download ZIP" untuk download project lengkap!**

**Made with ❤️ for SA-MP Community**

---

### **📞 Support**
- 📧 Email: support@samplauncher.plus
- 💬 Discord: [Join Community](https://discord.gg/samp)
- 🐛 Issues: [Report Bug](https://github.com/yourusername/samp-launcher-plus/issues)