const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { fullData, querySearchApi, paramApiSearch, dbQuery, paramDBSearch } = require('../controllers');
const { Pokemon, Type } = require('../db.js');

router.get('/', async (req, res) => {
    let { name } = req.query;
    try {
        const allPokemons = await fullData()

        if (name) {

            const nameInApi = await querySearchApi(name.toLocaleLowerCase()) //correcto name in api

            const nameInDb = await dbQuery(name.toLowerCase())// correcto name in db


            nameInApi ?
                res.status(200).json(nameInApi)
                : nameInDb ?
                    res.status(200).json(nameInDb)
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
    // const idConGuion = id.includes('-')
    try {
        const allPoke = await fullData()

        if (id) {

            const idInDb = await paramDBSearch(id) //correcto id in api

            const idInApi = await paramApiSearch(id)//correcto id in api

            idInApi ?
                res.status(200).json(idInApi)
                : idInDb ?
                    res.status(200).json(idInDb)
                    : res.status(404).json({ message: ` id ${id} not found` })


        } else {
            res.status(200).send(allPoke)
        };

    } catch (error) {
        res.status(500).json({ message: 'Error', error })
    }
})

router.post('/', async (req, res) => {
    const { name, image, life, attack, defense, speed, height, weight } = req.body

    try {
        let newPokemon = await Pokemon.create({
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight,

        })

        const findType = await Type.findAll({ where: { name: name } });

        await newPokemon.addType(findType);

        res.status(200).json(newPokemon)
    } catch (error) {
        res.status(500).json({ message: 'Error', error })
    }
});



module.exports = router;