const { readFileSync, writeFileSync , unlinkSync } = require ('fs')

const { join } = require('path')
const { all } = require('../app')

const model = {
    products: join(__dirname, '../data','productsDataBase.json'),
    index: ()=> JSON.parse(readFileSync(model.products, {encoding: 'utf-8'})),
    findOne: id => model.index().find(producto => producto.id == id),
    nextId: ()=>{
        const ultimoElemento = (model.index()).pop()
        return ultimoElemento.id +1
    },
    writeProduct:(array)=>{
        return writeFileSync(model.products, JSON.stringify(array))
    },
    deleteImage: (img)=>{
         return unlinkSync(join(__dirname, '../../public/images/products',img))
    },
    createProduct: (product) => {
       // 1. Traer todos los prods
       const allProducts = model.index()
        // 2. Crear identificador unico
        product.id = model.nextId()    
        // 3. pushear el producto nuevo en la lista de productos
        allProducts.push(product)
        // 4. volver a guardar los productos en el JSON
        model.writeProduct(allProducts)
    },
    updateProduct: (product)=>{
        const allProducts = model.index()
        const indexProduct= allProducts.findIndex(producto=>producto.id==product.id)

        if(indexProduct!==-1){
            allProducts[indexProduct]=product
        }else{
            allProducts.push(product)
        }
        model.writeProduct(allProducts)
    },
    deleteProduct: (product)=>{
        const allProducts = model.index()
        const newProducts = allProducts.filter(producto=> producto.id!=product.id)
        model.writeProduct(newProducts)

    }
}

module.exports = model