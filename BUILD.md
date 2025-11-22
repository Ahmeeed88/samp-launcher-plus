# Build Scripts

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Tauri development mode
npm run tauri dev

# Lint code
npm run lint

# Type check
npm run type-check
```

## Production Build

```bash
# Build web assets
npm run build

# Build Tauri application
npm run tauri build

# Build for specific platform
npm run tauri build -- --target x86_64-pc-windows-msvc  # Windows
npm run tauri build -- --target x86_64-unknown-linux-gnu  # Linux
npm run tauri build -- --target x86_64-apple-darwin     # macOS
```

## Release Distribution

### Windows
- Output: `src-tauri/target/release/bundle/msi/`
- Format: MSI installer
- Size: ~15MB

### Linux
- Output: `src-tauri/target/release/bundle/deb/`
- Format: DEB package
- Size: ~12MB

### macOS
- Output: `src-tauri/target/release/bundle/dmg/`
- Format: DMG image
- Size: ~18MB

## Post-Build

1. Test installer on clean system
2. Verify all functionality works
3. Check for memory leaks
4. Validate security certificates
5. Upload to distribution platform