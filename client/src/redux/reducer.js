//reducer / erika es una funcion que recibe 2 propiedades, el estado inicial y una accion
import { GET_ALL_POKEMONS, GET_ALL_TYPES, CREATE_POKEMON } from "./actions"

const initialState = {
    allPokemons: [],
    allTypes: [],
    allPokemonsCopy: []

}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload
            }
        case GET_ALL_TYPES:
            return {
                ...state,
                allTypes: action.payload
            }
        case CREATE_POKEMON:
            return {
                ...state,
            }
        default:
            return state;
    }
}


export default rootReducer