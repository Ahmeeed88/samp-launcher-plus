# SAMP Launcher Plus

![SAMP Launcher Plus](https://img.shields.io/badge/SAMP-Launcher%20Plus-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows-lightgrey?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Aplikasi desktop launcher untuk SA-MP (San Andreas Multiplayer) yang elegan dan modern dengan fitur auto-update mod dan monitoring server real-time.

## 🚀 Quick Start

### 📦 Download & Install

#### Option 1: Download Release (Recommended)
1. Go to [Releases Page](https://github.com/yourusername/samp-launcher-plus/releases)
2. Download `SAMP-Launcher-Plus-Setup-1.0.0.exe`
3. Run installer as Administrator
4. Launch application from Desktop/Start Menu

#### Option 2: Build from Source
```bash
# Clone repository
git clone https://github.com/yourusername/samp-launcher-plus.git
cd samp-launcher-plus

# Install dependencies
npm install

# Build application
npm run tauri build

# Find installer in: src-tauri/target/release/bundle/msi/
```

## 🎯 Features

- **🎨 Modern UI** - Elegant dark theme with smooth animations
- **📁 Smart Path Detection** - Automatic GTA SA folder validation
- **🔄 Auto-Update System** - One-click mod updates with progress tracking
- **📊 Real-time Monitoring** - Live server stats (players, ping, status)
- **⚡ Fast Performance** - Native performance with Rust backend
- **💾 Configuration Manager** - Persistent settings with auto-save
- **🔔 Smart Notifications** - Contextual alerts for updates and errors

## 📸 Screenshots

### Main Interface
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

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for elegant styling
- **Lucide React** for modern icons
- **Vite** for lightning-fast builds

### Backend
- **Rust** with Tauri framework
- **reqwest** for HTTP operations
- **zip** for file extraction
- **serde** for JSON serialization

### Features
- File system operations
- Process management
- Network queries
- Configuration persistence

## ⚙️ Configuration

### Environment Variables
Create `.env` file:
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

### Runtime Configuration
Configuration is saved in:
- **Windows**: `%APPDATA%/com.samplauncher.plus/launcher-config.json`

## 🎮 How to Use

1. **First Setup**
   - Launch "SAMP Launcher Plus"
   - Click "Browse" to select GTA San Andreas folder
   - Enter your SA-MP username
   - Click "Join Server"

2. **Daily Usage**
   - Launcher auto-loads your settings
   - Real-time server monitoring
   - Quick access to all actions
   - Background mod update checks

3. **Mod Updates**
   - Automatic check on startup
   - One-click download & install
   - Progress indicators
   - Version management

## 🔧 Development

### Prerequisites
- Node.js 18+
- Rust 1.70+
- Windows 10+ (for building)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/samp-launcher-plus.git
cd samp-launcher-plus

# Install dependencies
npm install

# Start development server
npm run tauri dev

# Build for production
npm run tauri build
```

### Project Structure
```
samp-launcher-plus/
├── src/                     # React frontend
│   ├── components/          # UI components
│   ├── hooks/              # React hooks
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── src-tauri/              # Rust backend
│   ├── src/                # Source code
│   ├── Cargo.toml          # Rust dependencies
│   └── tauri.conf.json     # Tauri config
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 📦 Build & Release

### Build Commands
```bash
# Development build
npm run tauri dev

# Production build
npm run tauri build

# Platform-specific builds
npm run tauri build -- --target x86_64-pc-windows-msvc
```

### Release Artifacts
- **Windows**: MSI installer (~15MB)
- **Linux**: DEB package (~12MB) 
- **macOS**: DMG image (~18MB)

## 🐛 Troubleshooting

### Common Issues

**"gta_sa.exe not found"**
- Ensure correct GTA SA folder selected
- Verify gta_sa.exe exists in the folder
- Run launcher as Administrator

**"Failed to launch game"**
- Check GTA SA installation integrity
- Disable antivirus temporarily
- Verify Windows Firewall settings

**"Server offline"**
- Check internet connection
- Verify server IP and port
- Contact server administrator

**"Mod update failed"**
- Ensure sufficient disk space
- Check internet connection
- Try manual download from provided link

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Include tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits & Thanks

- **[SA-MP Team](https://sa-mp.com/)** - San Andreas Multiplayer
- **[Tauri](https://tauri.app/)** - Amazing Rust-based app framework
- **[React](https://reactjs.org/)** - UI framework
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[Lucide](https://lucide.dev/)** - Beautiful icon library

## 📞 Support & Community

- 📧 Email: support@samplauncher.plus
- 💬 Discord: [Join our community](https://discord.gg/samp)
- 🐛 Issues: [Report bugs](https://github.com/yourusername/samp-launcher-plus/issues)
- 📖 Wiki: [Documentation](https://github.com/yourusername/samp-launcher-plus/wiki)

## 🗺️ Roadmap

### v1.1 (Planned)
- [ ] System tray integration
- [ ] Multiple server profiles
- [ ] In-game overlay
- [ ] Discord rich presence

### v1.2 (Future)
- [ ] Linux/macOS support
- [ ] Plugin system
- [ ] Custom themes
- [ ] Server browser

---

**⭐ Star this repository if you find it helpful!**

**Made with ❤️ for the SA-MP Community**