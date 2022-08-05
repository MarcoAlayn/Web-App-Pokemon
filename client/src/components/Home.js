import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPokemons } from "../redux/actions"
import Pagination from "./Pagination"
import PokeCard from "./PokeCard"
import { Link } from "react-router-dom"

const Home = () => {
    const allPokemons = useSelector(state => state.allPokemons)
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
    }, [dispatch])



    const handleRefresh = (e) => {
        e.preventDefault()
        dispatch(getAllPokemons())
    }


    return (
        <div>
            <button onClick={handleRefresh}>Refresh Pokemon List</button>
            <div>Home</div>
            <Pagination
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
                currentPage={currentPage}
            />
            <div>
                {currentPokemons.length ? currentPokemons.map(pokemon =>
                    <Link key={pokemon.id} to={`/detail/${pokemon.id}`} >
                        <PokeCard image={pokemon.image} name={pokemon.name} type={pokemon.type} />
                    </Link>)
                    : <div>Loading...</div>}
            </div>
        </div>
    )
}

export default Home