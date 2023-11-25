const fs = require('fs');
const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { index, findOne } = require('../modules/productModel')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const products= index();
		const oferta = products.filter((producto)=>producto.category=='in-sale')
		const visitado = products.filter((producto)=>producto.category=='visited')
		res.render('index',{oferta: oferta,visitado: visitado})
		},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
