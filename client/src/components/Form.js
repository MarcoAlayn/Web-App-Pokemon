import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTypes, postPokemon, getAllPokemons, getPokemonByName } from '../redux/actions'
import { useNavigate } from 'react-router-dom'


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
        image: '',
        type: []
    });

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
        if (personaje.life === 0 || personaje.attack === 0 || personaje.defense === 0 || personaje.speed === 0 || personaje.height === 0 || personaje.weight === 0) {
            errors.life = 'Complete all stats!'
        }
        return errors
    }

    const [errors, setErrors] = useState({});


    function handleOnChange(e) {
        setPersonaje({
            ...personaje,
            [e.target.name]: e.target.value
        })
        setErrors(validate(personaje, pokemonNames))
    }


    function handleOnSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length === 0 && personaje.name.length && personaje.type.length > 0) {
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

    return (
        <div className="formulario" >
            <h1>Create Your Pokemon </h1>
            <form onSubmit={e => handleOnSubmit(e)}>
                <div className="form-name">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={personaje.name} autoComplete='off' onChange={handleOnChange} />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="form-life">
                    <label htmlFor="life">Life:</label>
                    <input type="range" name="life" value={personaje.life} min="1" max="120" onChange={handleOnChange} />
                    <span>{personaje.life}</span>
                    {errors.life && <p className="error">{errors.life}</p>}
                </div>
                <div className='form-attack'>
                    <label htmlFor="attack">Attack:</label>
                    <input type="range" min="1" max="120" name="attack" value={personaje.attack} onChange={handleOnChange} />
                    <span className='attack-value'>{personaje.attack}</span>
                    {errors.attack && <p className="error">{errors.attack}</p>}
                </div>
                <div className='form-defense'>
                    <label htmlFor="defense">Defense:</label>
                    <input type="range" min="1" max="120" name="defense" value={personaje.defense} onChange={handleOnChange} />
                    <span className='defense-value'>{personaje.defense}</span>
                    {errors.defense && <p className="error">{errors.defense}</p>}
                </div>
                <div className='form-speed'>
                    <label htmlFor="speed">Speed:</label>
                    <input type="range" min="1" max="120" name="speed" value={personaje.speed} onChange={handleOnChange} />
                    <span className='speed-value'>{personaje.speed}</span>
                    {errors.speed && <p className="error">{errors.speed}</p>}
                </div>
                <div className='form-height'>
                    <label htmlFor="height">Height:</label>
                    <input type="range" min="1" max="120" name="height" value={personaje.height} onChange={handleOnChange} />
                    <span className='height-value'>{personaje.height}</span>
                    {errors.height && <p className="error">{errors.height}</p>}
                </div>
                <div className='form-weight'>
                    <label htmlFor="weight">Weight:</label>
                    <input type="range" min="1" max="120" name="weight" value={personaje.weight} onChange={handleOnChange} />
                    <span className='weight-value'>{personaje.weight}</span>
                    {errors.weight && <p className="error">{errors.weight}</p>}
                </div>
                <div className='form-image'>
                    <label htmlFor="image">Image:</label>
                    <input type="text" name="image" value={personaje.image}
                        pattern="https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$"
                        placeholder=' paste url image...'
                        autoComplete='off'
                        onChange={handleOnChange} />
                    {errors.image && <p className="error">{errors.image}</p>}
                </div>
                <div className='form-type'>
                    <select className='values' value='default' onChange={e => handleSelect(e)}>
                        <option value='default' disabled>Select up to Two Types</option>
                        {
                            personaje.type.length < 2 ? allTypes.map(type => (
                                <option key={type.id} value={type.name}>{type.name}</option>
                            )) : <option value='full' disabled>You have already selected two types</option>
                        }
                    </select>
                </div>
                <div className='create-type'>
                    {personaje.type.map(selectedType => (
                        <div key={selectedType} className='type-selected'>
                            <p>{selectedType}</p>
                            <button className='button-click' id={selectedType} onClick={handleClick}>X</button>
                        </div>
                    ))}
                    {errors.type && <p className="error">{errors.type}</p>}
                </div>
                <button type='submit' className='submit-button'>Create Pokemon</button>
            </form>
        </div>

    )
}