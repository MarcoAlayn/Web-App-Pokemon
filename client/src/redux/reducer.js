//reducer / erika es una funcion que recibe 2 propiedades, el estado inicial y una accion
import { GET_ALL_POKEMONS, GET_ALL_TYPES, CREATE_POKEMON, GET_NAMES_POKEMONS, GET_BY_TYPE, FILTER_CREATED, ORDER_BY_NAME } from "./actions"

const initialState = {
    allPokemons: [],
    allTypes: [],
    pokemonsByName: [],
    allPokemonsCopy: []

}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                allPokemonsCopy: action.payload,
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
        case GET_NAMES_POKEMONS:
            return {
                ...state,
                pokemonsByName: action.payload
            }
        case GET_BY_TYPE:
            const pokemonesFiltrados = state.allPokemonsCopy
            const pokeFiltered = action.payload === "all" ?
                pokemonesFiltrados :
                pokemonesFiltrados.filter(el => el.type.includes(action.payload))//se trae el pokemon donde sea true que contiene el tipo que se pasa por payload
            // console.log('esto me trae pokeFiltered:', pokeFiltered)
            return {
                ...state,
                allPokemons: pokeFiltered
            }

        case FILTER_CREATED:
            const allPokes = state.allPokemonsCopy
            const pokesCreated = action.payload === "all" ?
                allPokes : action.payload === "create" ? allPokes.filter(pokemon => pokemon.create) : allPokes.filter(pokemon => !pokemon.create)
            return {
                ...state,
                allPokemons: pokesCreated
            }
        case ORDER_BY_NAME:
            const pokes = state.allPokemonsCopy
            const sortingByName = action.payload === "asc" ?
                pokes.sort((a, b) => {
                    const nameA = a.name.toLowerCase()
                    const nameB = b.name.toLowerCase()
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;

                }) : action.payload === "desc" ?
                    pokes.sort((a, b) => {
                        const nameA = a.name.toLowerCase()
                        const nameB = b.name.toLowerCase()
                        if (nameA < nameB) return 1;
                        if (nameA > nameB) return -1;
                        return 0;
                    }) : null
            return {
                ...state,
                allPokemons: sortingByName
            }

        default:
            return state;
    }
}


export default rootReducer