const shirtsRouter = require('express').Router();
const Shirt = require('../models/shirt');

shirtsRouter.post('/', async (request, response) => {
    try {
        const { shirtName, shirtImage, shirtSize, shirtPrice} = request.body;
        console.log(request.body);
        const newShirt = new Shirt({
            shirtName,
            shirtImage, 
            shirtSize,
            shirtPrice, 
        });
        const savedShirt = await newShirt.save();
        return response.status(201).json(savedShirt);
    } catch (error) {
        console.error('La camisa no se creo :(', error);
        response.status(500).json({ error: 'Error, Error' });
    }
});

shirtsRouter.get('/', async (request, response) => {
    try {
        const shirts = await Shirt.find();
        return response.status(200).json(shirts);
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
});


shirtsRouter.delete('/:id', async (request, response) => {
    try {
        const user = request.user;

    await Shirt.findByIdAndDelete(request.params.id);
    
    // Inicializar user.products como un array vacío si es undefined
    user.shirts = user.shirts || [];

    // Eliminar el ID del producto de user.products
    const index = user.shirts.indexOf(request.params.id);
    if (index !== -1) {
        user.shirts.splice(index, 1);
        console.log(`Eliminando producto con ID ${request.params.id} del usuario ${user._id}`);
    }

    await user.save();
    console.log(`Productos actualizados del usuario ${user._id}: ${user.shirts}`);
    return response.status(204).send();
    } catch (error) {
        console.log(error);
        
    }
});

shirtsRouter.get('/:id', async (request, response) => {
    try {
        const shirtId = request.params.id;
        const shirt = await Shirt.findById(shirtId);
        if (!shirt) {
            return response.status(404).json({ error: 'La Camisa no existe' });
        }
        return response.status(200).json({ shirt });
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
});


shirtsRouter.patch('/:id', async (request, response) => {
    const shirtId = request.params.id;
    const { shirtName, shirtImage, shirtSize, shirtPrice} = request.body;

    try {
        const updatedShirt = await Shirt.findByIdAndUpdate(shirtId, {
            shirtName,
            shirtImage, 
            shirtSize,
            shirtPrice, 
        }, { new: true });

        return response.status(200).json(updatedShirt);
    } catch (error) {
        console.error(error);
        return response.sendStatus(402);
    }
});

module.exports = shirtsRouter;