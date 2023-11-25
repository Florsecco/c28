const { readFileSync, writeFileSync, readFile} = require ('fs')

const { join } = require('path')

const model = {
    file: join(__dirname, '../data','productsDataBase.json'),
    index: ()=> JSON.parse(readFileSync(model.file)),
    findOne: id => model.index().find(producto => producto.id == id)
}

module.exports = model