import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllPokemons, getPokemonByType, getAllTypes, filterCreated, orderByName, orderByAttack } from "../redux/actions"
import Pagination from "./Pagination"
import PokeCard from "./PokeCard"
import SearchBar from "./SearchBar"

const Home = () => {
    const allPokemons = useSelector(state => state.allPokemons)
    const allTypes = useSelector(state => state.allTypes)

    const dispatch = useDispatch();

    const [render, /*setLoaded*/] = useState(allPokemons.length ? true : false)
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
        if (!render) {
            dispatch(getAllPokemons())
            dispatch(getAllTypes())
        }

    }, [render, dispatch])



    const handleRefresh = (e) => {
        e.preventDefault()
        dispatch(getAllPokemons())
    }

    function handleFilterByType(e) {
        e.preventDefault()
        dispatch(getPokemonByType(e.target.value))
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1)
        e.target.value = "default"
    }

    function handleFilterByOrigin(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1)
        e.target.value = "default"
    }

    function handleOrderByName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setOrder(`Order ${e.target.value}`, order)
        setCurrentPage(1)
        e.target.value = "default"

    }

    function handleOrderByAttack(e) {
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
        setOrder(`Order ${e.target.value}`, order)
        e.target.value = "default"
    }

    return (
        <div>

            <button onClick={handleRefresh}>Refresh Pokemon List</button>
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
                <div>
                    <span>Order by Attack</span>
                    <select onChange={e => handleOrderByAttack(e)}>
                        <option value="default">Select Order</option>
                        <option value="highest" >highest attack</option>
                        <option value="least" >least attack</option>
                    </select>
                </div>
                {/* filtros */}
                <div>
                    <span>Filter By Type:</span>
                    <select onChange={e => handleFilterByType(e)} >
                        <option value="default">Select Type</option>
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
                        <option value="default">Select Origin</option>
                        <option value="api" >Originals</option>
                        <option value="create">Created By User</option>
                    </select>
                </div>
            </form >
            <div>
                {
                    currentPokemons.length ?
                        < Pagination
                            pokemonsPerPage={pokemonsPerPage}
                            allPokemons={allPokemons}
                            paginado={paginado}
                            currentPage={currentPage}
                        /> : null
                }
            </div>
            <SearchBar />
            <div>
                {
                    currentPokemons === 0 ? <h3>There are no Pokemons...</h3>
                        : currentPokemons.length ? currentPokemons.map(pokemon =>
                            <Link key={pokemon.id} to={`/detail/${pokemon.id}`} >
                                <PokeCard image={pokemon.image} name={pokemon.name} type={pokemon.type} />
                            </Link>)
                            : <h3>Loading Pokemons...</h3>
                }

            </div>
            <div>
                {
                    currentPokemons.length ?
                        < Pagination
                            pokemonsPerPage={pokemonsPerPage}
                            allPokemons={allPokemons}
                            paginado={paginado}
                            currentPage={currentPage}
                        /> : null
                }
            </div>
        </div >
    )
}

export default Home