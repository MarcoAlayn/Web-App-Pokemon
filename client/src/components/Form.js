import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTypes, postPokemon } from '../redux/actions'


function Form() {

    const pokeTypes = useSelector(state => state.allTypes)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch])



    //necesitamos una funcion que escriba por nosotros el formulario
    function handleChange(e) {
        setNewPokemon({        //guarda la info que va escribiendo el usuario
            ...newPokemon,
            [e.target.name]: [e.target.value]
        }) // va a ser un objeto con todo lo que tenia anteriormente
        setErrorsForm(formValidate(newPokemon))
        console.log('esto es newPokemon:', newPokemon)
    }

    // function handleOnChange(e) {
    //     setNewPokemon((...prevData) => {
    //         return {
    //             ...prevData,
    //             [e.target.name]: e.target.value
    //         }
    //     })
    // }

    //necesitamos una funcion que maneje los tipos 
    const handleTypes = (e) => {
        setNewPokemon({
            ...newPokemon,
            type: [...new Set([...newPokemon.type, e.target.value])] //concatenamos los types
        })
        console.log('esto es newPokemon:', newPokemon)
    }


    const [newPokemon, setNewPokemon] = useState({
        name: '',
        image: '',
        attack: 0,
        defense: 0,
        height: 0,
        life: 0,
        speed: 0,
        weight: 0,
        type: []
    })



    const [errorsForm, setErrorsForm] = useState({})
    console.log('errorsForm', errorsForm)
    // const [disableButton, /*setErrorButton*/] = useState(true)


    //necesitamos una funcion que se encargue de enviar el formulario al backend por nosotros 
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorsForm(formValidate(newPokemon))
        dispatch(postPokemon(newPokemon))
        setNewPokemon({
            name: '',
            image: '',
            attack: 0,
            defense: 0,
            height: 0,
            life: 0,
            speed: 0,
            weight: 0,
            type: []
        })
        // history.push("/create")
        alert("pokemon creado")
        console.log('esto es submit:', newPokemon)
    }


    const validateName = (str) => {
        if (str === '') return true
        else if (!/^[a-zA-Z]*$/.test(str)) return true
    }

    //necesitamos una funcion que valide los datos
    const formValidate = (pokeForm) => {
        let errores = {}
        if (validateName(pokeForm.name)) errores.name = "existen errores en el nombre"
        return errores
    }




    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label>Name</label>
                        <input name='name' value={newPokemon.name} onChange={(e) => handleChange(e)}></input>
                        {errorsForm.name ? <h4><small>{errorsForm.name}</small></h4> : false}
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
                        <select name='type' value={newPokemon.type} onChange={(e) => handleTypes(e)} >
                            {pokeTypes.length > 0 ? pokeTypes.map((type, index) =>
                                <option value={type.name} key={index}>{type.name}</option>)
                                : false}
                        </select>
                        {/* --------- */}
                        <div>
                            {!errorsForm.name ? <button type='submit'>Create my Pokemon</button> : <p>llena los campos necesarios</p>}
                        </div>
                        {/* --------- */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form