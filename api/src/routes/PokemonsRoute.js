const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { fullData, querySearchApi, dataBD, querySearchDB, fullParamSearch, paramApiSearch } = require('../controllers');
const { Pokemon, Type } = require('../db.js');

router.get('/', async (req, res) => {
    let { name } = req.query;
    try {
        const allPokemons = await fullData()

        if (name) {
            const aux = await querySearchApi(name.toLowerCase());
            aux
                ?
                res.status(200).json(aux)
                : res.status(404).json({ message: `pokemon ${name} not found` })
        } else {
            res.status(200).send(allPokemons)
        };
    } catch (error) {
        res.status(500).json({ message: "Error", error })
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const allPokemons = await fullData()
        if (id) {
            const aux = await fullParamSearch(id)
            // const aux = await paramApiSearch(id)
            aux
                ? res.status(200).json(aux)
                : res.status(400).json({ message: `id ${id} not found` })

        } else {
            res.status(200).json(fullData)
        }

    } catch (error) {
        res.status(500).json({ message: 'Error', error })
    }
})

router.post('/', async (req, res) => {
    const { name, image, life, attack, defense, speed, height, weight, types } = req.body

    try {
        let newPokemon = await Pokemon.create({
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight
        })

        // const findType = await Type.findAll({ where: { name: types } });

        // await newPokemon.addType(findType);

        res.status(200).json(newPokemon)
    } catch (error) {
        res.status(500).json({ message: 'Error', error })
    }
});



module.exports = router;