const fs = require('fs');
const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { index, findOne } = require('../modules/productModel')

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
	index: (req, res) => {
		const products= index();
		const oferta = products.filter((producto)=>producto.category=='in-sale')
		const visitado = products.filter((producto)=>producto.category=='visited')
		res.render('index',{oferta: oferta,visitado: visitado, toThousand:toThousand})
		},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
