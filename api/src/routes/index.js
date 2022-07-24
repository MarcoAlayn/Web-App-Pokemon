const { Router } = require('express');
const PokemonsRoute = require('./PokemonsRoute.js');
const router = Router();

const TypeRoute = require('./TypeRoute');

router.use('/pokemons', PokemonsRoute);
router.use('/types', TypeRoute);


module.exports = router;
