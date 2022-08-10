import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllPokemons, getPokemonByFilter, getAllTypes } from "../redux/actions"
import Pagination from "./Pagination"
import PokeCard from "./PokeCard"
import SearchBar from "./SearchBar"

const Home = () => {
    const allPokemons = useSelector(state => state.allPokemons)
    const allTypes = useSelector(state => state.allTypes)

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage; //1 * 12 = 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //12 - 12 = 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon); //0, 12

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
    }, [dispatch])



    const handleRefresh = (e) => {
        e.preventDefault()
        dispatch(getAllPokemons())
    }

    function handleFilters(e) {
        e.preventDefault()
        dispatch(getPokemonByFilter(e.target.value))
    }

    return (
        <div>

            <button onClick={handleRefresh}>Refresh Pokemon List</button>
            <SearchBar />

            {/* filtros */}
            <form className="filters">
                <div>
                    <span>Select By Type:</span>
                    <select onChange={e => handleFilters(e)} >
                        <option value="all">All</option>
                        {
                            allTypes && allTypes.map(type => {
                                return <option value={type.name} key={type.id} onChange={e => handleFilters(e)}>{type.name}</option>
                            })
                        }
                    </select>
                </div>
            </form >

            {/* ordenamientos */}
            <div>{currentPokemons.length ?
                < Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                    currentPage={currentPage}
                /> : null}
            </div>
            <div>
                {
                    currentPokemons.length ? currentPokemons.map(pokemon =>
                        <Link key={pokemon.id} to={`/detail/${pokemon.id}`} >
                            <PokeCard image={pokemon.image} name={pokemon.name} type={pokemon.type} />
                        </Link>)
                        : <h3>There are no Pokemons...</h3>
                }

            </div>
            <div>{currentPokemons.length ?
                < Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                    currentPage={currentPage}
                /> : null}
            </div>
        </div >
    )
}

export default Home