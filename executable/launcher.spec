# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['launcher.py'],
    pathex=[],
    binaries=[],
    datas=[('../backend', 'backend')],
    hiddenimports=[
        'flask',
        'werkzeug',
        'jinja2',
        'click',
        'psutil',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['setuptools'],
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='launcher',
    debug=True,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,  # Disable UPX compression
    runtime_tmpdir='.',  # Remove temporary directory
    console=True,  # Temporarily enable console for debugging
    disable_windowed_traceback=False,
    argv_emulation=False,
)