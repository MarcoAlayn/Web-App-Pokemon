import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonById, resetDetail } from '../redux/actions'
import NavBar from './NavBar'
import './DetailPokemon.css'

function DetailPokemon() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams()

    const myPokemon = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getPokemonById(id))
        // cuando se desmonta dispatcha la funcion que resetea el estado detail

    }, [id, dispatch])


    const onNavigateBack = () => {

        dispatch(resetDetail())
        return navigate(-1)
    }

    return (
        <div className='fullContainer' >
            <NavBar />
            <div className='detail-container' >

                {
                    myPokemon.length > 0 ?
                        <div className='card' >

                            <h2 className='pokeTag' >Name:<span className='pokeName' >{myPokemon[0].name}</span></h2>
                            <img className='cardImage' src={myPokemon[0].image} alt='img not found' />

                            <div className='Pokevalues'>
                                <h4>Id:{myPokemon[0].id}</h4>
                                <h3>Types:{myPokemon[0].type}</h3>
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