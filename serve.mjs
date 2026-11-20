import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const files = new Map([['/', ['index.html','text/html']], ['/index.html',['index.html','text/html']], ['/style.css',['style.css','text/css']], ['/town.js',['town.js','application/javascript']]]);
const port = Number(process.env.PORT || 4173);
createServer(async (req, res) => {
  const file = files.get(req.url.split('?')[0]);
  if (!file) { res.writeHead(404).end(); return; }
  try { const data = await readFile(new URL(file[0],import.meta.url)); res.writeHead(200,{'Content-Type':file[1]+'; charset=utf-8'}).end(data); }
  catch { res.writeHead(500).end('Run npm run build first.'); }
}).listen(port,'127.0.0.1',()=>console.log('Briarwick is open at http://127.0.0.1:'+port));
