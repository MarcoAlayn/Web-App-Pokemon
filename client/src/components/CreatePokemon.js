import React from 'react'
import { useNavigate } from 'react-router-dom'
import Form from './Form';
import NavBar from './NavBar'

function CreatePokemon() {

    const navigate = useNavigate();

    const onNavigateBack = () => {
        return navigate(-1)
    }
    return (
        <div>
            <NavBar />
            <div>Create Your Pokemon</div>
            <Form />
            <button onClick={onNavigateBack}>
                Back
            </button>
        </div>
    )
}

export default CreatePokemon