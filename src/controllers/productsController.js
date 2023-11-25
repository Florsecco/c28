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
		res.send('soy el store de productos')
	},

	// Update - Form to edit
	edit: (req, res) => {
		console.log('query', req.query._method);
		res.send({message: 'oks'})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		console.log('query', req.query._method);
		res.send({message: 'oks'})
	}
};

module.exports = controller;