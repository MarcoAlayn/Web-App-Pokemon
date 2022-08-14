//reducer / erika es una funcion que recibe 2 propiedades, el estado inicial y una accion
import { GET_ALL_POKEMONS, GET_ALL_TYPES, CREATE_POKEMON, GET_NAMES_POKEMONS, GET_BY_TYPE, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_ATTACK, GET_BY_ID } from "./actions"

const initialState = {
    allPokemons: [],
    allTypes: [],
    pokemonsByName: [],
    allPokemonsCopy: [],
    detail: []
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
                allPokemons: action.payload
            }
        case GET_BY_TYPE:
            const pokemonesFiltrados = state.allPokemonsCopy
            const pokeFiltered = pokemonesFiltrados.filter(el => el.type.includes(action.payload))//se trae el pokemon donde sea true que contiene el tipo que se pasa por payload
            console.log('esto me trae pokeFiltered:', pokeFiltered)
            return {
                ...state,
                allPokemons: pokeFiltered
            }

        case FILTER_CREATED:
            const allPokes = state.allPokemonsCopy
            const pokesCreated = action.payload === "create" ? allPokes.filter(pokemon => pokemon.create) : allPokes.filter(pokemon => !pokemon.create)
            console.log('esto me trae pokesCreated:', pokesCreated)
            return {
                ...state,
                allPokemons: pokesCreated
            }
        case ORDER_BY_NAME:
            const pokes = state.allPokemons
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
            console.log('esto me trae sortingByName:', sortingByName)
            return {
                ...state,
                allPokemons: sortingByName
            }

        case ORDER_BY_ATTACK:
            const pokeList = state.allPokemons
            const pokesByAttack = action.payload === "least" ?
                pokeList.sort((a, b) => {
                    if (a.attack < b.attack) return -1
                    if (a.attack > b.attack) return 1
                    return 0;
                })
                : action.payload === "highest" ?
                    pokeList.sort((a, b) => {
                        if (a.attack < b.attack) return 1
                        if (a.attack > b.attack) return -1
                        return 0;
                    }) : null

            console.log('esto me trae pokesByAttack:', pokesByAttack)
            return {
                ...state,
                allPokemons: pokesByAttack
            }

        case GET_BY_ID:
            console.log('esto me trae el reducer GET_BY_ID:', GET_BY_ID)
            return {
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }
}


export default rootReducer