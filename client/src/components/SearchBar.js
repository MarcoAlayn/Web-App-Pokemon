import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPokemonByName } from '../redux/actions'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder="Pokemon name..." value={name} onChange={e => handleChange(e)} />
                <button type='submit' >Search</button>
            </form>
        </div>
    )
}

