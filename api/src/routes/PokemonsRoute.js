const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { fullData, querySearchApi, dataBD, querySearchDB } = require('../controllers')

router.get('/', async (req, res, next) => {
    let { name } = req.query;
    const allPokemons = await fullData()
    if (name) {
        name = name.toLowerCase();
        try {
            const aux = await querySearchApi(name);
            res.status(200).send(aux)
        } catch (err) {
            next(err)
        };
    } else {
        res.status(200).send(allPokemons)
    };


});
router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {

    } catch (err) {
        next(err)
    }
});

router.post('/', async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
});



// GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal

// GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

// GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado

// POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.



module.exports = router;