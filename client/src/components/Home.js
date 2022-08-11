import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllPokemons, getPokemonByType, getAllTypes, filterCreated, orderByName } from "../redux/actions"
import Pagination from "./Pagination"
import PokeCard from "./PokeCard"
import SearchBar from "./SearchBar"

const Home = () => {
    const allPokemons = useSelector(state => state.allPokemons)
    const allTypes = useSelector(state => state.allTypes)
    // const filtrados = useSelector(state => state.filtro)

    const dispatch = useDispatch();

    const [loaded, /*setLoaded*/] = useState(allPokemons.length ? true : false)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage; //1 * 12 = 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //12 - 12 = 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon); //0, 12

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        if (!loaded) {
            dispatch(getAllPokemons())
            dispatch(getAllTypes())
        }

    }, [loaded, dispatch])



    const handleRefresh = (e) => {
        e.preventDefault()
        dispatch(getAllPokemons())
    }

    function handleFilterByType(e) {
        e.preventDefault()
        dispatch(getPokemonByType(e.target.value))
    }

    function handleFilterByOrigin(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1)
    }

    function handleOrderByName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setOrder(`Order ${e.target.value}`, order)
        setCurrentPage(1)
        e.target.value = "default"

    }
    return (
        <div>

            <button onClick={handleRefresh}>Refresh Pokemon List</button>
            <SearchBar />
            <form className="filters">
                {/* ordenamientos */}
                <div>
                    <span>Order By Name:</span>
                    <select onChange={e => handleOrderByName(e)} >
                        <option value="default">Select Order</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                {/* filtros */}
                <div>
                    <span>Filter By Type:</span>
                    <select onChange={e => handleFilterByType(e)} >
                        <option value="all">All</option>
                        {
                            allTypes && allTypes.map(type => {
                                return <option value={type.name} key={type.id} onChange={e => handleFilterByType(e)}>{type.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <span>Filter By Origin:</span>
                    <select onChange={e => handleFilterByOrigin(e)}>
                        <option value="all" >All</option>
                        <option value="api" >Originals</option>
                        <option value="create">Created By User</option>
                    </select>
                </div>
            </form >
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