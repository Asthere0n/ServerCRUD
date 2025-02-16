import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// starting the server with express
const app = express();
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000);
console.log(`Server functioning in http://localhost:3000`)

app.get('/', (req, res)=>{
    res.render('index')
})

// Redirection 301
app.get('/index.html', (req, res)=>{
    res.redirect('/')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

// 404 page
app.use((req, res)=>{
    res.status(404).render('404')
})