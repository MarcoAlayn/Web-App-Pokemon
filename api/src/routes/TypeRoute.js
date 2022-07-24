const { Router } = require('express');
const axios = require('axios');
const router = Router();

router.get('/', (req, res) => {
    res.send('ruta get all types')

});

// GET /types:
//Obtener todos los tipos de pokemons posibles
//En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


module.exports = router;