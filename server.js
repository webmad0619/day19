const express = require("express")
const app = express()

class Product{
    constructor(name, price) {
        this._id = Math.round(Math.random() * 100000)
        this.name = name;
        this.price = price;
    }
}

const products = [
    new Product("blade runner dvd", 20),
    new Product("blade runner 2050 dvd", 30),
    new Product("contact dvd", 15),
]

//// THESE ARE QUERY STRINGS

// example http://localhost:3000/product?productId=74200
// query string is: ?productId=74200
app.get("/product", (req, res, next) => {
    console.log(req.query)
    console.log(req.query.productId)

    res.json(products.find(product => product._id === +req.query.productId))
})

app.get('/findProduct', (req, res) => {
    res.send(`<form action="/ctrujillo" method="GET">
    <label for="">Product id</label>
    <input type="text" name="productId" id="">
    <label for="">Min price</label>
    <input type="text" name="minPrice" id="">
    <button type="submit">SEARCH</button>
  </form>`)
})

app.get("/products", (req, res) => {
    res.json(products)
})


//// THESE ARE ROUTE PARAMS

// app.get("/products", (req, res) => {
//     res.json(products)
// })

// app.get("/products/max/:maxPrice", (req, res) => {
//     res.json(products.filter(product => product.price <= +req.params.maxPrice))
// })

// app.get("/products/min/:minPrice", (req, res) => {
//     res.json(products.filter(product => product.price >= +req.params.minPrice))
// })

// app.get("/product/:productId", (req, res) => {
//     res.json(products.find(product => product._id === +req.params.productId))
// })

// app.get("/product/:productId/:field", (req, res) => {
//     const foundProduct = products.find(product => product._id === +req.params.productId)
//     const extractedProperty = foundProduct[req.params.field]
//     const output = {}
//     output[req.params.field] = extractedProperty

//     res.json(output)
// })

app.listen(3000)