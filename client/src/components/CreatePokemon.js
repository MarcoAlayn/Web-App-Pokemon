import React from 'react'
import { useNavigate } from 'react-router-dom'

function CreatePokemon() {

    const navigate = useNavigate();

    const onNavigateBack = () => {
        return navigate(-1)
    }
    return (
        <div>
            <div>You are in CreatePokemon</div>
            <button onClick={onNavigateBack}>
                Back
            </button>
        </div>
    )
}

export default CreatePokemon