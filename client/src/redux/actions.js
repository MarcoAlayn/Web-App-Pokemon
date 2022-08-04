import axios from 'axios'

//RUTAS BACKEND
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";


// //FILTROS
// export const GET_BY_NAME = "GET_BY_NAME";
// export const GET_BY_ID = "GET_BY_ID";
// export const GET_BY_TYPE = "GET_BY_TYPE";
// export const ALPHABETIC_ORDER = "ALPHABETIC_ORDER"; //y descendente o descendente
// export const GET_BY_CREATED = "GET_BY_CREATED";
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

