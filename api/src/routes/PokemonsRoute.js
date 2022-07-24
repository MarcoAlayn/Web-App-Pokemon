const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { fullData, querySearchApi, dataBD, querySearchDB } = require('../controllers')

router.get('/', async (req, res, next) => {
    const { name } = req.query;

    const allData = await fullData()

    try {
        if (name && name !== '') {
            const pokemonInApi = await querySearchApi(name.toLowerCase()); //todos los pokemones que coincidieron con el name del query
            const pokemonInDB = await querySearchDB(name.toLowerCase())//todos los pokemones que coincidieron en DB

            const queryResult = pokemonInDB.concat(pokemonInApi) //concatenamos ambas busquedas(API & DB)

            queryResult ? res.status(200).send(queryResult) : res.status(400).send('el pokemon no existe')
            console.log('esto devuelve queryResult:', queryResult)

        } else {
            res.send(allData)
            return
        };
    } catch (e) {
        next(e)
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