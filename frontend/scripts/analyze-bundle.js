/**
 * Bundle analysis script
 */

import fs from 'fs'
import path from 'path'

/* eslint-env node */
const distPath = path.join(process.cwd(), 'dist')
const jsPath = path.join(distPath, 'js')
const cssPath = path.join(distPath, 'css')

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath)
    return stats.size
  } catch (error) {
    return 0
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function analyzeDirectory(dirPath, extension) {
  const files = fs.readdirSync(dirPath)
  const results = []
  
  files.forEach(file => {
    if (file.endsWith(extension)) {
      const filePath = path.join(dirPath, file)
      const size = getFileSize(filePath)
      results.push({
        name: file,
        size: size,
        formattedSize: formatBytes(size)
      })
    }
  })
  
  return results.sort((a, b) => b.size - a.size)
}

function generateReport() {
  console.log('📊 Bundle Analysis Report')
  console.log('=' .repeat(50))
  
  // Analyze JavaScript files
  console.log('\n📦 JavaScript Files:')
  const jsFiles = analyzeDirectory(jsPath, '.js')
  let totalJSSize = 0
  
  jsFiles.forEach(file => {
    console.log(`  ${file.name}: ${file.formattedSize}`)
    totalJSSize += file.size
  })
  
  console.log(`\n  Total JS: ${formatBytes(totalJSSize)}`)
  
  // Analyze CSS files
  console.log('\n🎨 CSS Files:')
  const cssFiles = analyzeDirectory(cssPath, '.css')
  let totalCSSSize = 0
  
  cssFiles.forEach(file => {
    console.log(`  ${file.name}: ${file.formattedSize}`)
    totalCSSSize += file.size
  })
  
  console.log(`\n  Total CSS: ${formatBytes(totalCSSSize)}`)
  
  // Total bundle size
  const totalSize = totalJSSize + totalCSSSize
  console.log(`\n📈 Total Bundle Size: ${formatBytes(totalSize)}`)
  
  // Performance recommendations
  console.log('\n💡 Performance Recommendations:')
  
  if (totalJSSize > 500 * 1024) { // 500KB
    console.log('  ⚠️  JavaScript bundle is large. Consider code splitting.')
  }
  
  if (totalCSSSize > 100 * 1024) { // 100KB
    console.log('  ⚠️  CSS bundle is large. Consider purging unused styles.')
  }
  
  if (jsFiles.length > 20) {
    console.log('  ⚠️  Many JavaScript chunks. Consider consolidating.')
  }
  
  // Largest files
  console.log('\n🔍 Largest Files:')
  const allFiles = [...jsFiles, ...cssFiles].sort((a, b) => b.size - a.size)
  allFiles.slice(0, 5).forEach((file, index) => {
    console.log(`  ${index + 1}. ${file.name}: ${file.formattedSize}`)
  })
  
  // Vendor analysis
  console.log('\n📚 Vendor Analysis:')
  const vendorFiles = jsFiles.filter(file => 
    file.name.includes('vendor') || 
    file.name.includes('vue') || 
    file.name.includes('pinia')
  )
  
  let vendorSize = 0
  vendorFiles.forEach(file => {
    console.log(`  ${file.name}: ${file.formattedSize}`)
    vendorSize += file.size
  })
  
  console.log(`  Total Vendor: ${formatBytes(vendorSize)}`)
  console.log(`  Vendor %: ${((vendorSize / totalJSSize) * 100).toFixed(1)}%`)
  
  // Generate HTML report
  generateHTMLReport(jsFiles, cssFiles, totalJSSize, totalCSSSize)
}

function generateHTMLReport(jsFiles, cssFiles, totalJSSize, totalCSSSize) {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Bundle Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 8px; }
        .section { margin: 20px 0; }
        .file-list { background: #f9f9f9; padding: 15px; border-radius: 5px; }
        .file-item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
        .file-item:last-child { border-bottom: none; }
        .size { font-weight: bold; color: #007acc; }
        .recommendations { background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; }
        .warning { color: #856404; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Bundle Analysis Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="section">
        <h2>📦 JavaScript Files (${jsFiles.length} files)</h2>
        <div class="file-list">
            ${jsFiles.map(file => `
                <div class="file-item">
                    <span>${file.name}</span>
                    <span class="size">${file.formattedSize}</span>
                </div>
            `).join('')}
        </div>
        <p><strong>Total JS: ${formatBytes(totalJSSize)}</strong></p>
    </div>
    
    <div class="section">
        <h2>🎨 CSS Files (${cssFiles.length} files)</h2>
        <div class="file-list">
            ${cssFiles.map(file => `
                <div class="file-item">
                    <span>${file.name}</span>
                    <span class="size">${file.formattedSize}</span>
                </div>
            `).join('')}
        </div>
        <p><strong>Total CSS: ${formatBytes(totalCSSSize)}</strong></p>
    </div>
    
    <div class="section">
        <h2>📈 Summary</h2>
        <p><strong>Total Bundle Size: ${formatBytes(totalJSSize + totalCSSSize)}</strong></p>
    </div>
    
    <div class="section">
        <h2>💡 Performance Recommendations</h2>
        <div class="recommendations">
            ${totalJSSize > 500 * 1024 ? '<p class="warning">⚠️ JavaScript bundle is large. Consider code splitting.</p>' : ''}
            ${totalCSSSize > 100 * 1024 ? '<p class="warning">⚠️ CSS bundle is large. Consider purging unused styles.</p>' : ''}
            ${jsFiles.length > 20 ? '<p class="warning">⚠️ Many JavaScript chunks. Consider consolidating.</p>' : ''}
            ${totalJSSize <= 500 * 1024 && totalCSSSize <= 100 * 1024 ? '<p>✅ Bundle sizes look good!</p>' : ''}
        </div>
    </div>
</body>
</html>
  `
  
  const reportPath = path.join(distPath, 'bundle-analysis.html')
  fs.writeFileSync(reportPath, html)
  console.log(`\n📄 HTML report generated: ${reportPath}`)
}

// Run the analysis
generateReport()
