import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTypes } from '../redux/actions'

const Form = () => {

    const pokeTypes = useSelector(state => state.allTypes)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch])

    const [newPokemon, setNewPokemon] = useState({
        name: '',
        attack: '',
        defense: '',
        height: '',
        life: '',
        speed: '',
        weight: '',
        image: '',
        type: []
    })

    const [errorButton, setErrorButton] = useState(false)

    //necesitamos una funcion que escriba por nosotros el formulario
    const handleChange = (e) => { }

    //necesitamos una funcion que se encargue de enviar el formulario al backend por nosotros 
    const handleSubmit = (e) => { }

    //necesitamos una funcion que maneje los tipos 
    const handleTypes = (e) => { }


    //necesitamos una funcion que valide los datos
    const formValidate = (data) => { }


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label>Name</label>
                        <input name='name' value={newPokemon.name} onChange={(e) => handleChange(e)}></input>
                        {/* --------- */}
                        <label>Defense</label>
                        <input name='defense' value={newPokemon.defense} onChange={(e) => handleChange(e)}></input>
                        {/* --------- */}
                        <label>Height</label>
                        <input name='height' value={newPokemon.height} onChange={(e) => handleChange(e)}></input>
                        {/* --------- */}
                        <label>Weight</label>
                        <input name='weight' value={newPokemon.weight} onChange={(e) => handleChange(e)}></input>
                        {/* --------- */}
                        <label>Life</label>
                        <input name='life' value={newPokemon.life} onChange={(e) => handleChange(e)}></input>
                        {/* --------- */}
                        <label>Attack</label>
                        <input name='attack' value={newPokemon.attack} onChange={(e) => handleChange(e)}></input>
                        {/* --------- */}
                        <label>Speed</label>
                        <input name='speed' value={newPokemon.speed} onChange={(e) => handleChange(e)}></input>
                        {/* --------- */}
                        <label>Image</label>
                        <input name='image' value={newPokemon.image} onChange={(e) => handleChange(e)}></input>
                        {/* --------- */}
                        <label>Type</label>
                        <select name='type' value={newPokemon.type} onChange={(e) => handleTypes(e)} id="SelectType" >
                            {pokeTypes.length > 0 ? pokeTypes.map((type, index) =>
                                <option value={type.id} key={index}>{type.name}</option>)
                                : <h2><small>loading types</small></h2>}
                        </select>
                        {/* --------- */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form