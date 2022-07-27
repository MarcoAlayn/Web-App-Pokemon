const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db.js')
const router = Router();

router.get('/', async (req, res) => {
    try {
        // primero los fuardamos en db desde la api
        let urlTypes = await axios("https://pokeapi.co/api/v2/type")

        let mapApiTypes = urlTypes.data.results.map(type => type.name)

        await mapApiTypes.map(pokeType => {
            Type.findOrCreate({
                where: { name: pokeType }
            })
        })


        // despues enviamos todo la data de tablas
        const allTypesInDb = await Type.findAll()

        res.status(200).json(allTypesInDb)

    } catch (error) {
        res.status(500).json({ message: "Error", error })
    }

});

// GET /types:
//Obtener todos los tipos de pokemons posibles
//En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


module.exports = router;