import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPokemonByName } from '../redux/actions'
import './SearchBar.css'

export default function SearchBar() {

    const dispatch = useDispatch()


    const [name, setName] = useState('')

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getPokemonByName(name))
        setName('')
    }


    return (
        <div className='searchBar' >
            <form onSubmit={e => handleSubmit(e)}>
                <input className='searchBarInput' type='text' placeholder="Pokemon name..." value={name} onChange={e => handleChange(e)} />
                <button className='searchBarButton' type='submit' >Search</button>
            </form>
        </div>
    )
}

