import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonById, resetDetail } from '../redux/actions'
import NavBar from './NavBar'
import './DetailPokemon.css'
import Loader from './Loader'

function DetailPokemon() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams()

    const myPokemon = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getPokemonById(id))

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

                            <h2 className='pokeTag' style={{ color: '#002e74' }} >Name:<span style={{ color: '#b3110f' }} className='pokeName' >{myPokemon[0].name}</span></h2>
                            <img className='cardImage' src={myPokemon[0].image} alt='img not found' />

                            <div className='Pokevalues'>
                                <span className='pokeTag'>Id:<span className='pokeName' >{myPokemon[0].id}</span></span>
                                <span className='pokeTag'>Type:<span className='pokeName' >{myPokemon[0].type[0]}</span></span>
                                {myPokemon[0].type[1] && <span className='pokeTag'>2ndType:<span className='pokeName' >{myPokemon[0].type[1]}</span></span>}
                                <span className='pokeTag'>Life:<span className='pokeName' >{myPokemon[0].life}</span></span>
                                <span className='pokeTag'>Attack:<span className='pokeName' >{myPokemon[0].attack}</span></span>
                                <span className='pokeTag'>Defense:<span className='pokeName' >{myPokemon[0].defense}</span></span>
                                <span className='pokeTag'>Speed:<span className='pokeName' >{myPokemon[0].speed}</span></span>
                                <span className='pokeTag'>Height:<span className='pokeName' >{myPokemon[0].height}</span></span>
                                <span className='pokeTag'>Weight:<span className='pokeName' >{myPokemon[0].weight}</span></span>
                            </div>

                        </div>
                        : <div className='loadingLoader'><Loader /></div>
                }
            </div >
            <div className='detail-container' >
                <button className='buttonBack' onClick={onNavigateBack}>
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default DetailPokemon