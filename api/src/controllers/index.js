const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
// const { Op } = require('sequelize');


//request para traerme mis 40 Pokemones

// pedido a la API

const dataApi = async () => {
    try {
        const request = await axios('https://pokeapi.co/api/v2/pokemon?limit=40');
        const subRequest = await Promise.all(request.data.results.map(e => axios(e.url)))

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
        // console.log('esto me trae el proto de mi modelo Pokemon:', Pokemon.prototype)
        // console.log('esto me trae el pokeApi:', pokeApi)
        return pokeApi;
    } catch (error) {
        console.log(error)
    }
}

//pedido a la DB
const dataBD = async () => {
    try {
        const infoDb = await Pokemon.findAll({
            include: {
                model: Type,
                atributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        console.log('esto es infoDb:', infoDb)
        return infoDb
    } catch (error) {
        console.log(error)
    }
};



//uno mis dos solicitudes
const fullData = async () => {
    try {
        let apiInfo = await dataApi();
        let dbInfo = await dataBD();
        const concatData = await apiInfo.concat(dbInfo);
        // console.log('esto es concatData:', concatData)
        return concatData;

    } catch (error) {
        console.log(error)
    }
};

///////////////////////////////////////////////////////////////////////////////////
////////////////SOLICITUD PARA MIS REQUEST POR QUERY

const querySearchApi = async (name) => {
    try {

        const pokeQuery = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);

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
        console.log('esto es pokeSearch:', pokeSearch)
        return pokeSearch
    } catch (error) {
        console.error(error)
    }
};

const dbQuery = async (name) => {
    try {
        const nameQuery = await Pokemon.findOne({
            where: { name: name },
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            }
        });

        console.log('esto es nameQuery:', nameQuery)
        return nameQuery
    } catch (error) {
        console.error(error)
    }
}



///////////////////////////////////////////////////////////////////////////////////
////////////////SOLICITUD PARA MIS REQUEST POR PARAMS//

// pedido a la API
const paramApiSearch = async (id) => {
    try {
        const pokeParamApi = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeParam = {
            name: pokeParamApi.data.name,
            id: pokeParamApi.data.id,
            life: pokeParamApi.data.stats.find(e => e.stat.name === 'hp').base_stat,
            attack: pokeParamApi.data.stats.find(e => e.stat.name === 'attack').base_stat,
            defense: pokeParamApi.data.stats.find(e => e.stat.name === 'defense').base_stat,
            speed: pokeParamApi.data.stats.find(e => e.stat.name === 'speed').base_stat,
            height: pokeParamApi.data.height,
            weight: pokeParamApi.data.weight,
            type: pokeParamApi.data.types.map(e => e.type.name),
            image: pokeParamApi.data.sprites.other.dream_world.front_default
        }
        console.log('esto me trae pokeParamApi:', pokeParamApi)
        return pokeParam
    } catch (error) {
        console.error(error)
    }
}

//pedido a la DB
const paramDBSearch = async (id) => {
    try {
        const pokeParamDb = await Pokemon.findByPk(id, {
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        console.log('esto me trae paramDBSearch:', paramDBSearch)
        return pokeParamDb
    } catch (error) {
        console.error(error)
    }
}

//uno mis dos solicitudes
// const fullParamSearch = async (id) => {
//     const guion = id.includes('-')

//     try {
//         if (guion) {
//             const apiParam = await paramApiSearch(id)
//             return apiParam
//         } else {
//             const dbParam = await paramDBSearch(id)
//             console.log('esto me trae dbParam:', dbParam)
//             return dbParam
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports = {
    dataApi, dataBD, fullData, querySearchApi, dbQuery, paramApiSearch, paramDBSearch
}