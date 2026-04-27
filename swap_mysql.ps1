Stop-Service -Name MySQL80 -Force -ErrorAction SilentlyContinue
Stop-Process -Name mysqld -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

if (Test-Path "C:\ProgramData\MySQL\MySQL Server 8.0\Data") {
    # Backup original
    if (Test-Path "C:\Program Files\MySQL\MySQL Server 8.0\data") {
        Rename-Item -Path "C:\Program Files\MySQL\MySQL Server 8.0\data" -NewName "data_backup_20260426_234741" -Force
    }
    
    # Copy populated data
    Copy-Item -Path "C:\ProgramData\MySQL\MySQL Server 8.0\Data" -Destination "C:\Program Files\MySQL\MySQL Server 8.0\data" -Recurse -Force
}

Start-Service -Name MySQL80
