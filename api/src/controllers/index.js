const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
// limitar a 40 pokemones en la solicitud
//12 pokemons por pagina en el front
//
// Imagen
// Nombre
// Tipos (Electrico, Fuego, Agua, etc)

//request para traerme mis 40 Pokemones
// pedido a la API

const dataApi = async () => {
    const request = await axios('https://pokeapi.co/api/v2/pokemon?limit=40');
    const subRequest = await Promise.all(request.data.results.map(e => axios(e.url)))

    try {
        const pokeApi = subRequest.map((pokemon) => {
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                life: pokemon.data.stats.find(e => e.stat.name === "hp")?.base_stat,
                attack: pokemon.data.stats.find(e => e.stat.name === "attack")?.base_stat,
                defense: pokemon.data.stats.find(e => e.stat.name === "defense")?.base_stat,
                speed: pokemon.data.stats.find(e => e.stat.name === "speed")?.base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                type: pokemon.data.types?.map(e => e.type.name),
                image: pokemon.data.sprites.other.dream_world.front_default

            }
        })
        return pokeApi;
    } catch (error) {
        console.log(error)
    }
}

//pedido a la DB
const dataBD = async () => {
    try {
        return await Pokemon.findAll({
            include: [{
                model: Type,
                attributes: ['name'],
                through: { attributes: [] }
            }]
        })
    } catch (error) {
        console.log(error)
    }
};



//uno mis dos solicitudes
const fullData = async () => {

    const querySearch = () => { }
    let apiInfo = await dataApi();
    let dbInfo = await dataBD();
    const concatData = [...apiInfo, dbInfo];
    return concatData;
};

///////////////////////////////////////////////////////////////////////////////////
//SOLICITUD PARA MIS REQUEST POR QUERY

const querySearchApi = async (name) => {
    const pokeQuery = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);


    try {
        const pokeSearch = {
            name: pokeQuery.data.name,
            id: pokeQuery.data.id,
            life: pokeQuery.data.stats.find(e => e.stat.name === 'hp').base_stat,
            attack: pokeQuery.data.stats.find(e => e.stat.name === 'attack').base_stat,
            defense: pokeQuery.data.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: pokeQuery.data.stats.find(e => e.stat.name === 'speed').base_stat,
            height: pokeQuery.data.height,
            weight: pokeQuery.data.weight,
            type: pokeQuery.data.types.map(e => e.type.name),
            image: pokeQuery.data.sprites.other.dream_world.front_default

        }
        // console.log('esto devuelve pokequery:', pokeSearch)
        return pokeSearch
    } catch (error) {
        console.error(error)
    }
};

const querySearchDB = async (name) => {
    try {
        const pokemonInDb = await Pokemon.findAll({
            where: { name: { [Op.like]: `%${name}` } },
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: [] }
            }
        })
        return pokemonInDb
    } catch (error) {
        console.error(error)
    }

}
///////////////////////////////////////////////////////////////////////////////////
//SOLICITUD PARA MIS REQUEST POR PARAMS//

// pedido a la API
const paramApiSearch = () => { }

//pedido a la DB
const paramDBSearch = () => { }

//uno mis dos solicitudes
const fullParamSearch = () => { }

module.exports = {
    dataApi, fullData, querySearchApi, dataBD, querySearchDB
}