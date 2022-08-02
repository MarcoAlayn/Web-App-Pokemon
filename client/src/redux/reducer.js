//reducer / erika es una funcion que recibe 2 propiedades, el estado inicial y una accion
import { GET_ALL_POKEMONS } from "./actions"

var initialState = {
    allPokemons: [],
    allPokemonsCopy: []

}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return ({
                ...state,
                allPokemons: action.payload
            })

        default:
            return state;
    }
}


export default rootReducer