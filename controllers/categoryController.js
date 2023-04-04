const { Category, Product } = require('../models')

class Controller {
    static getCategories(req, res) {
        Category.findAll({
            include: {
                model: Product,
                attributes: ["id", "title"]
            }
        })
            .then(data => {
                res.render('categories', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getAdd(req, res) {
        res.render('formAdd')
    }

    static postAdd(req, res) {
        const { name } = req.body
        
        Category.create({ name })
            .then(() => {
                res.redirect('/categories')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getEdit(req, res) {
        Category.findOne({ where: { id: req.params.id } })
            .then(data => {
                res.render('formEdit', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postEdit(req, res) {
        const { name } = req.body

        Category.update({ name }, { where: { id: req.params.id } })
            .then(() => {
                res.redirect('/categories')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static destroy(req, res) {
        Category.destroy({ 
            where: { id: req.params.id },  
            individualHooks: true // update destroy
        })
            .then(() => {
                res.redirect('/categories')
            })
            .catch(err => {
                console.log(err.message);
                res.send(err)
            })
    }
}

module.exports = Controller