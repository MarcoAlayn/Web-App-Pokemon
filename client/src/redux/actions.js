import axios from 'axios'

//RUTAS BACKEND
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_NAMES_POKEMONS = "GET_NAMES_POKEMONS";
export const GET_BY_TYPE = "GET_BY_FILTER";
export const FILTER_CREATED = "FILTER_CREATED";
// //FILTROS
// export const GET_BY_ID = "GET_BY_ID";
// export const GET_BY_TYPE = "GET_BY_TYPE";
// export const ALPHABETIC_ORDER = "ALPHABETIC_ORDER"; //y descendente o descendente
// export const GET_BY_ATTACk = "GET_BY_ATTACk"; //y descendente o descendente

export const getAllPokemons = () => {
    return async (dispatch) => {

        const pokemons = await axios.get("http://localhost:3001/pokemons")
        console.log("esto es data del dispatch get allPokemons:", pokemons.data)
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: pokemons.data
        })
    }
}

export const getAllTypes = () => {
    return async (dispatch) => {
        const types = await axios.get("http://localhost:3001/types")
        console.log("esto es data del dispatch get types:", types.data)
        return dispatch({
            type: GET_ALL_TYPES,
            payload: types.data
        })
    }
}

export const postPokemon = (payload) => {
    return async (dispatch) => {
        const postData = await axios.post("http://localhost:3001/pokemons", payload)
        console.log("esto es data del dispatch get postData:", postData.data)
        return dispatch({
            type: CREATE_POKEMON,

        })
    }
}


export const getPokemonByName = (name) => {
    return async (dispatch) => {
        try {
            const pokeName = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            console.log("esto es data del dispatch get pokeName:", pokeName.data)
            return dispatch({
                type: GET_NAMES_POKEMONS,
                payload: pokeName.data
            })
        } catch (error) {
            alert('There is no Pokemon with that name')
            console.log(error);
        }
    }
}

export const getPokemonByType = (payload) => {
    console.log('esto es el payload GET_BY_TYPE:', payload)
    return {
        type: GET_BY_TYPE,
        payload
    }

}

export const filterCreated = (payload) => {
    console.log('esto es el payload filterCreated:', payload)
    return {
        type: FILTER_CREATED,
        payload
    }
}