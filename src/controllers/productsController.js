const fs = require('fs');
const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { index, findOne } = require('../modules/productModel')
//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const toThousand = n =>{
	//separar parte entera y decimal
	const [parteEntera, parteDecimal]= n.toString().split('.')
	//agregar puntos como separadores de miles a la parte entera
	const parteEnteraFormateada = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
	//devolver la parte entera formateada y la parte decimal si existe
	return parteDecimal
	? `${parteEnteraFormateada},${parteDecimal}`: parteEnteraFormateada
}

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products',{ productos : index(),toThousand:toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const idEncontrado= req.params.id
		const productoEncontrado = findOne(idEncontrado)
		return res.render('detail', { product: productoEncontrado , toThousand:toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log('estamos en el store');
		res.send({message: 'oks estamos en el store'})
	},

	// Update - Form to edit
	edit: (req, res) => {
		const idEncontrado= req.params.id
		const productoEncontrado = findOne(idEncontrado)
		res.render('product-edit-form', {product: productoEncontrado})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		res.send({message:'oks estamos en update'})
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		console.log('query', req.query._method);
		res.send({message: 'oks estamos en delete'})
	}
};

module.exports = controller;