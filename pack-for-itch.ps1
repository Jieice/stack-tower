# Stack Tower - Itch.io 打包脚本
# 自动创建发布包

Write-Host "📦 开始打包 Stack Tower for Itch.io..." -ForegroundColor Cyan
Write-Host ""

# 创建发布文件夹
$releaseDir = "stack-tower-release"
if (Test-Path $releaseDir) {
    Write-Host "🗑️  删除旧的发布文件夹..." -ForegroundColor Yellow
    Remove-Item $releaseDir -Recurse -Force
}

Write-Host "📁 创建发布文件夹..." -ForegroundColor Green
New-Item -ItemType Directory -Path $releaseDir | Out-Null

# 复制必要的文件
Write-Host "📋 复制游戏文件..." -ForegroundColor Green

# 复制主文件
Copy-Item "index.html" -Destination $releaseDir
Write-Host "  ✓ index.html" -ForegroundColor White

# 复制CSS
Copy-Item "css" -Destination $releaseDir -Recurse
Write-Host "  ✓ css/" -ForegroundColor White

# 复制JS
Copy-Item "js" -Destination $releaseDir -Recurse
Write-Host "  ✓ js/" -ForegroundColor White

# 复制音频文件（只复制需要的文件）
Write-Host "  复制音频文件..." -ForegroundColor Gray
New-Item -ItemType Directory -Path "$releaseDir/sounds" | Out-Null
New-Item -ItemType Directory -Path "$releaseDir/sounds/kenney_interface-sounds" | Out-Null
New-Item -ItemType Directory -Path "$releaseDir/sounds/kenney_interface-sounds/Audio" | Out-Null

# 复制BGM
Copy-Item "sounds/BGM.mp3" -Destination "$releaseDir/sounds/"

# 只复制需要的音效文件
$soundFiles = @(
    "click_001.ogg",
    "drop_002.ogg",
    "confirmation_002.ogg",
    "scratch_002.ogg",
    "glass_002.ogg"
)

foreach ($file in $soundFiles) {
    Copy-Item "sounds/kenney_interface-sounds/Audio/$file" -Destination "$releaseDir/sounds/kenney_interface-sounds/Audio/"
}

# 复制License
Copy-Item "sounds/kenney_interface-sounds/License.txt" -Destination "$releaseDir/sounds/kenney_interface-sounds/" -ErrorAction SilentlyContinue

Write-Host "  ✓ sounds/" -ForegroundColor White

# 可选：复制截图文件夹（如果存在）
if (Test-Path "screenshots") {
    Write-Host "  提示：记得手动上传screenshots文件夹到itch.io" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ 文件复制完成！" -ForegroundColor Green
Write-Host ""

# 创建ZIP文件
$zipName = "stack-tower-v1.2.zip"
Write-Host "🗜️  创建ZIP压缩包..." -ForegroundColor Cyan

if (Test-Path $zipName) {
    Remove-Item $zipName -Force
}

# 使用PowerShell压缩
Compress-Archive -Path "$releaseDir/*" -DestinationPath $zipName -CompressionLevel Optimal

Write-Host ""
Write-Host "✅ 打包完成！" -ForegroundColor Green
Write-Host ""
Write-Host "📦 发布文件:" -ForegroundColor Cyan
Write-Host "  📄 $zipName" -ForegroundColor White
Write-Host ""

# 显示文件大小
$zipSize = (Get-Item $zipName).Length / 1MB
Write-Host "📊 文件大小: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Yellow
Write-Host ""

Write-Host "🚀 下一步:" -ForegroundColor Cyan
Write-Host "  1. 访问 https://itch.io/dashboard" -ForegroundColor White
Write-Host "  2. 点击 'Create new project'" -ForegroundColor White
Write-Host "  3. 上传 $zipName" -ForegroundColor White
Write-Host "  4. 勾选 'This file will be played in the browser'" -ForegroundColor White
Write-Host "  5. 设置视窗大小: 800 x 600" -ForegroundColor White
Write-Host "  6. 上传screenshots文件夹中的截图" -ForegroundColor White
Write-Host "  7. 复制 ITCH_DESCRIPTION.md 的内容作为描述" -ForegroundColor White
Write-Host "  8. 发布！" -ForegroundColor White
Write-Host ""
Write-Host "💡 提示：查看 PUBLISH_CHECKLIST.md 获取完整发布指南" -ForegroundColor Gray
Write-Host ""
