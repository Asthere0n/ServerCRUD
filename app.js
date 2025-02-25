import { create } from 'domain';
import express from 'express';
import path from 'path';
import { title } from 'process';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Blog } from './models/blog.js'
import { atlasUser, atlasPassword } from './DBaccess.js'


// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// starting the server with express
const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

// Connect to MongoDB 
const dbURI = `mongodb+srv://${atlasUser}:${atlasPassword}@tutorial0.08f9w.mongodb.net/tutorial0?retryWrites=true&w=majority&appName=Tutorial0`
mongoose.connect(dbURI).then((result) => {
    console.log('Connected to MongoDB')
    // listen for requests
    app.listen(3000);
    console.log(`Server functioning in http://localhost:3000`)
}).catch(() => {
    console.error('Error: Connection to MongoDB failed')
})

// Create a new blog and save it in DB
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'blog 3',
        snippet: 'about my new new new blog',
        body: 'Lorem ipsum brother'
    })

    blog.save().then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

// To see all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find().then((result)=>{
        res.send(result)
    })
})


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.get('/blogs', (req, res) => {
    res.render('blogs', { title: 'Blogs' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Post' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404')
})