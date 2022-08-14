import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonById } from '../redux/actions'

function DetailPokemon() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams

    const myPokemon = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getPokemonById(id))
    }, [dispatch, id])


    const onNavigateBack = () => {
        return navigate(-1)
    }

    return (
        <div>
            <div>
                {
                    myPokemon.length > 0 ?
                        <div>
                            <img src={myPokemon[0].image} alt='img not found' />
                            <h2>Name:{myPokemon[0].name}</h2>
                            <h4>Id:{myPokemon[0].id}</h4>
                            <h3>Types:{myPokemon[0].types}</h3>
                            <div>
                                <span>Life:{myPokemon[0].life}</span>
                                <span>Attack:{myPokemon[0].attack}</span>
                                <span>Defense:{myPokemon[0].defense}</span>
                                <span>Speed:{myPokemon[0].speed}</span>
                                <span>Height:{myPokemon[0].height}</span>
                                <span>Weight:{myPokemon[0].weight}</span>
                            </div>
                        </div>
                        : <h3>Loading</h3>
                }
            </div>
            <button onClick={onNavigateBack}>
                Back
            </button>
        </div>
    )
}

export default DetailPokemon