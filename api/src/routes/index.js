const { Router } = require('express');
const PokemonsRoute = require('./PokemonsRoute.js');
const TypeRoute = require('./TypeRoute.js');
const router = Router();


router.use('/pokemons', PokemonsRoute);
router.use('/types', TypeRoute);


module.exports = router;
