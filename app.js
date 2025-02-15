import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// starting the server with express
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res)=>{
    res.sendFile('./views/index.html', {root: path.dirname(__filename)})
})

// Redirection 301
app.get('/index.html', (req, res)=>{
    res.redirect('/')
})

app.get('/about', (req, res)=>{
    res.sendFile('./views/about.html', {root: path.dirname(__filename)})
})

// 404 page
app.use((req, res)=>{
    res.status(404).sendFile('./views/404.html', {root: path.dirname(__filename)})
})