const salesRouter = require('express').Router();
const Sale = require('../models/sale');
 
salesRouter.post('/', async (request, response) => {
    try {
        const user = request.user;
        const { shirts, totalPrice} = request.body;

        // Crea una nueva instancia de Purchase con los datos recibidos
        const newSale = new Sale({
            shirts,
            totalPrice,
            user:user._id
        });

        // Guarda la nueva compra en la base de datos
        const savedSale = await newSale.save();

        // Agrega la compra al usuario
        user.sales.push(savedSale._id);
        await user.save();
       
        return response.status(201).json(savedSale);
    } catch (error) {
        console.error('Error al crear la compra:', error);
        return response.status(403).json({ error: 'Error al crear la compra' });
    }
});

module.exports = salesRouter;