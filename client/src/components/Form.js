import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTypes, postPokemon, getAllPokemons, getPokemonByName } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import defaultImage from '../images/default.png'
import './Form.css'
import { resetDetail } from '../redux/actions'

const validate = (personaje, pokemonNames) => {
    let errors = [];
    let RegExpression = /^[a-zA-Z\s]*$/;



    if (!personaje.name) {
        errors.name = 'Name is required'
    } else if (pokemonNames.includes(personaje.name)) {
        errors.name = 'That Pokemon name already exists'
    } else if (personaje.name.length < 4 || personaje.name.length > 10) {
        errors.name = 'Name must be longer than three characters... And less than 10!'
    } else if (!RegExpression.test(personaje.name)) {
        errors.name = 'Special characters and numbers are not allowed'
    }
    if (personaje.life === 0 || personaje.attack === 0 || personaje.defense === 0 || personaje.speed === 0 || personaje.height === 0 || personaje.weight === 0 || personaje.image === 0 || personaje.type === 0) {
        errors.type = 'Complete all stats!'
    }
    return errors
}
export default function Formulario() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTypes = useSelector(state => state.allTypes);
    const pokemonNames = useSelector(state => state.allPokemons.map(pokemon => pokemon.name));

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, [dispatch])


    const [personaje, setPersonaje] = useState({
        name: '',
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: defaultImage,
        type: []
    });


    const [errors, setErrors] = useState({});


    function handleOnChange(e) {
        setPersonaje({
            ...personaje,
            [e.target.name]: e.target.value
        })
        setErrors(validate({ ...personaje, [e.target.name]: e.target.value }, pokemonNames))
    }


    function handleOnSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length === 0 && personaje.name.length && personaje.type.length > 0) {
            // !personaje.image ? setPersonaje({ ...personaje.image = '../../../images/default.png' }) : setPersonaje(personaje)
            dispatch(postPokemon(personaje));
            dispatch(getPokemonByName(personaje.name))
            alert('Pokemon created successfully')
            navigate('/home')

        } else {
            alert('Complete all fields')
        }
        setPersonaje(personaje)
    }

    function handleSelect(e) {
        if (personaje.type.filter(type => type === e.target.value).length) {
            personaje.type.pop()
            alert('You have already chosen this type')
        }

        setPersonaje({
            ...personaje,
            type: [...personaje.type, e.target.value]
        })
    }

    function handleClick(e) {
        e.preventDefault();
        setPersonaje({
            ...personaje,
            type: personaje.type.filter(type => type !== e.target.id)

        })
    }

    const onNavigateBack = () => {

        dispatch(resetDetail())
        return navigate(-1)
    }

    return (
        <div className="formContainer" >
            <h1 className='titleForm'>Enter the values ​​and create your pokemon</h1>
            <form className="formulario" onSubmit={e => handleOnSubmit(e)}>
                <div className="form-container">
                    <div className='labelInputContainer' >
                        <label className='label-text' htmlFor="name">Name:</label>
                        <input placeholder=' Introduce the name...' className='form-name-input' type="text" name="name" value={personaje.name} autoComplete='off' onChange={e => handleOnChange(e)} />
                    </div>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className='form-bar'>
                    <label htmlFor="attack">Attack:</label>
                    <input type="range" min="1" max="120" name="attack" value={personaje.attack} onChange={handleOnChange} />
                    <span className='attack-value'>{personaje.attack}</span>
                    {errors.attack && <p className="error">{errors.attack}</p>}
                </div>
                <div className='form-bar'>
                    <label htmlFor="defense">Defense:</label>
                    <input type="range" min="1" max="120" name="defense" value={personaje.defense} onChange={handleOnChange} />
                    <span className='defense-value'>{personaje.defense}</span>
                    {errors.defense && <p className="error">{errors.defense}</p>}
                </div>
                <div className='form-bar'>
                    <label htmlFor="speed">Speed:</label>
                    <input type="range" min="1" max="120" name="speed" value={personaje.speed} onChange={handleOnChange} />
                    <span className='speed-value'>{personaje.speed}</span>
                    {errors.speed && <p className="error">{errors.speed}</p>}
                </div>
                <div className='form-bar'>
                    <label htmlFor="height">Height:</label>
                    <input type="range" min="1" max="120" name="height" value={personaje.height} onChange={handleOnChange} />
                    <span className='height-value'>{personaje.height}</span>
                    {errors.height && <p className="error">{errors.height}</p>}
                </div>
                <div className='form-bar'>
                    <label htmlFor="weight">Weight:</label>
                    <input type="range" min="1" max="120" name="weight" value={personaje.weight} onChange={handleOnChange} />
                    <span className='weight-value'>{personaje.weight}</span>
                    {errors.weight && <p className="error">{errors.weight}</p>}
                </div>
                <div className="form-bar">
                    <label htmlFor="life">Life:</label>
                    <input className='demo' type="range" name="life" value={personaje.life} min="1" max="120" onChange={handleOnChange} />
                    <span>{personaje.life}</span>
                    {errors.life && <p className="error">{errors.life}</p>}
                </div>
                <div className='form-container'>
                    <div className='labelInputContainer' >

                        <label className='label-text' htmlFor="image">Image:</label>
                        <input className='form-name-input' type="text" name="image" value={personaje.image}

                            placeholder=' paste url image...'
                            autoComplete='off'

                            onChange={handleOnChange} />
                    </div>

                </div>
                <div className='form-types'>
                    <select className='create-button' value='default' onChange={e => handleSelect(e)}>
                        <option value='default' disabled>Select up to Two Types</option>
                        {
                            personaje.type.length < 2 ? allTypes.map(type => (
                                <option key={type.id} value={type.name}>{type.name.toUpperCase()}</option>
                            )) : <option value='full' disabled>You have already selected two types</option>
                        }
                    </select>
                </div>
                <div className='remove-types'>
                    {personaje.type.map(selectedType => (
                        <div key={selectedType} className='type-selected'>
                            <button className='create-button' id={selectedType} onClick={handleClick}>X</button>
                            <p>{selectedType.toUpperCase()}</p>
                        </div>
                    ))}
                    {errors.type && <p className="error">{errors.type}</p>}
                </div>
                <button className='create-button' type='submit' >CREATE YOUR POKEMON</button>
            </form>
            <div className='detail-container' >
                <button className='buttonBack' onClick={onNavigateBack}>
                    Go Back
                </button>
            </div>
        </div>

    )
}