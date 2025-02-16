import { create } from 'domain';
import express from 'express';
import path from 'path';
import { title } from 'process';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// starting the server with express
const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static('public'))

// listen for requests
app.listen(3000);
console.log(`Server functioning in http://localhost:3000`)

app.get('/', (req, res)=>{
    res.render('index', {title: 'Home'})
})

app.get('/blogs', (req, res)=>{
    res.render('blogs', {title: 'Blogs'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Post'})
})

app.get('/about', (req, res)=>{
    res.render('about', {title : 'About Us'})
})

// 404 page
app.use((req, res)=>{
    res.status(404).render('404')
})