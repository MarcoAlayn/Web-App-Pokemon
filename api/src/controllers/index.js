const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
// const { Op } = require('sequelize');


//request para traerme mis 40 Pokemones

// pedido a la API

const dataApi = async () => {
    try {


        // //get 40 pokemones usando el filtro de la api
        // const request = await axios('https://pokeapi.co/api/v2/pokemon?limit=40');
        // const concatRequest = await Promise.all(request.data.results.map(e => axios(e.url)))
        // console.log('esto me trae el subRequest:', subRequest)

        //mi primeros 20 pokes
        const urlRequest = await axios("https://pokeapi.co/api/v2/pokemon")
        const urlRequestOne = await Promise.all(urlRequest.data.results.map(e => axios(e.url)))

        //mi segundos 20 pokes

        const urlRequestNext = await axios(urlRequest.data.next)
        const urlRequestTwo = await Promise.all(urlRequestNext.data.results.map(e => axios(e.url)))

        //concatenamos todas las url
        const concatRequest = await Promise.all(urlRequestOne.concat(urlRequestTwo))


        const pokeApi = concatRequest.map((pokemon) => {
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
        // console.log('esto es infoDb:', infoDb)
        return infoDb
    } catch (error) {
        console.log(error)
    }
};



//uno mis dos solicitudes
const fullData = async () => {
    try {
        const apiInfo = await dataApi();
        const dbInfo = await dataBD();

        const mapeo = dbInfo.map(poke => {
            return {
                id: poke.id,
                name: poke.name,
                image: poke.image,
                life: poke.life,
                attack: poke.attack,
                defense: poke.defense,
                speed: poke.speed,
                height: poke.height,
                weight: poke.weight,
                create: poke.create,
                type: poke.types.map(e => e.name)
            }
        })
        const concatData = await apiInfo.concat(mapeo);
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

        const pokeSearch = [{
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

        }]
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
        return [nameQuery]
    } catch (error) {
        console.error(error)
    }
}
const dbQueryMapped = async (name) => {
    try {

        const dbInfoMap = await dbQuery(name);

        const mapping = dbInfoMap.map(poke => {
            return {
                id: poke.id,
                name: poke.name,
                image: poke.image,
                life: poke.life,
                attack: poke.attack,
                defense: poke.defense,
                speed: poke.speed,
                height: poke.height,
                weight: poke.weight,
                create: poke.create,
                type: poke.types.map(e => e.name)
            }
        })

        console.log('esto es mapping:', mapping)
        return mapping;

    } catch (error) {
        console.log(error)
    }
};


///////////////////////////////////////////////////////////////////////////////////
////////////////SOLICITUD PARA MIS REQUEST POR PARAMS//

// pedido a la API
const paramApiSearch = async (id) => {
    try {
        const pokeParamApi = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeParam = [{
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
        }]
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
        return [pokeParamDb]
    } catch (error) {
        console.error(error)
    }
}

const paramDBSearchMapped = async (id) => {
    try {

        const dbInfo = await paramDBSearch(id);

        const mapeo = dbInfo.map(poke => {
            return {
                id: poke.id,
                name: poke.name,
                image: poke.image,
                life: poke.life,
                attack: poke.attack,
                defense: poke.defense,
                speed: poke.speed,
                height: poke.height,
                weight: poke.weight,
                create: poke.create,
                type: poke.types.map(e => e.name)
            }
        })

        console.log('esto es paramDBSearchMapped:', paramDBSearchMapped)
        return mapeo;

    } catch (error) {
        console.log(error)
    }
};



module.exports = {
    dataApi, dataBD, fullData, querySearchApi, dbQuery, paramApiSearch, paramDBSearch, paramDBSearchMapped, dbQueryMapped
}