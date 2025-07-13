import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
}

function serveFile(path, res) {
  try {
    const ext = extname(path)
    const contentType = mimeTypes[ext] || 'application/octet-stream'
    
    const content = readFileSync(path)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content)
  } catch (error) {
    res.writeHead(404)
    res.end('File not found')
  }
}

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  const url = req.url
  let filePath = ''

  if (url.startsWith('/react-app/')) {
    filePath = join(__dirname, 'apps/react-app/dist', url.replace('/react-app', ''))
  } else if (url.startsWith('/job-search/')) {
    filePath = join(__dirname, 'apps/job-search/dist', url.replace('/job-search', ''))
  } else {
    res.writeHead(404)
    res.end('Not found')
    return
  }

  if (existsSync(filePath)) {
    serveFile(filePath, res)
  } else {
    res.writeHead(404)
    res.end('File not found')
  }
})

const PORT = 3003
server.listen(PORT, () => {
  console.log(`Remote apps server running at http://localhost:${PORT}`)
  console.log('Available routes:')
  console.log('  /react-app/* -> React app files')
  console.log('  /job-search/* -> Job Search app files')
}) 