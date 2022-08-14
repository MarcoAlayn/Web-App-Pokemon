import axios from 'axios'

//export types
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_NAMES_POKEMONS = "GET_NAMES_POKEMONS";
export const GET_BY_TYPE = "GET_BY_TYPE";
export const GET_BY_ID = "GET_BY_ID";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK"

//action creators
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

export const orderByName = (payload) => {
    console.log('esto es el payload orderByName:', payload)
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByAttack = (payload) => {
    console.log('esto es el payload orderByAttack:', payload)
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

export const getPokemonById = (Id) => {
    return async (dispatch) => {
        try {
            const pokeId = await axios.get(`http://localhost:3001/pokemons/${Id}`)
            console.log("esto es data del dispatch get pokeId:", pokeId.data)
            return dispatch({
                type: GET_BY_ID,
                payload: pokeId.data
            })
        } catch (error) {
            alert('There is no Pokemon with that Id')
            console.log(error);
        }
    }
}