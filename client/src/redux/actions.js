import axios from 'axios'

//RUTAS BACKEND
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const CREATE_POKEMON = "CREATE_POKEMON";

//FILTROS
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const GET_BY_TYPE = "GET_BY_TYPE";
export const ALPHABETIC_ORDER = "ALPHABETIC_ORDER"; //y descendente o descendente
export const GET_BY_CREATED = "GET_BY_CREATED";
export const GET_BY_ATTACk = "GET_BY_ATTACk"; //y descendente o descendente

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {

            const { data } = await axios("http://localhost:3001/pokemons")
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

