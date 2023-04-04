const express = require('express')
const app = express()
const port = 3000

const CategoryController = require('./controllers/categoryController')
const ProductController = require('./controllers/productController')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

// Categories
app.get('/categories', CategoryController.getCategories)
app.get('/categories/add', CategoryController.getAdd)
app.post('/categories/add', CategoryController.postAdd)
app.get('/categories/:id/edit', CategoryController.getEdit)
app.post('/categories/:id/edit', CategoryController.postEdit)
app.get('/categories/:id/delete', CategoryController.destroy)

// Products
app.get('/products', ProductController.getProducts)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})