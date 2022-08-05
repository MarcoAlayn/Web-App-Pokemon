import PokeCard from "./PokeCard"
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPokemons } from '../redux/actions'

const AllCards = () => {
    let todosLosPokes = useSelector(state => state.allPokemons)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPokemons())
    }, [dispatch])

    return (
        <div>
            <div>
                {todosLosPokes.length > 0 ? todosLosPokes.map(pokemon =>
                    <Link key={pokemon.id} to={`/detail/${pokemon.id}`} >
                        <PokeCard image={pokemon.image} name={pokemon.name} type={pokemon.type} />
                    </Link>)
                    : <h2>No hay pokemons</h2>}
            </div>
        </div>
    )
}

export default AllCards