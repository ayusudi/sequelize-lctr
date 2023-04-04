const { Product, Category } = require('../models')

class Controller {
    static getProducts(req, res) {
        Product.findAll({
            include: [Category]
        })
            .then(data => {
                res.render("products", {data})
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }
}

module.exports = Controller