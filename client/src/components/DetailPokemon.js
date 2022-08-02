import React from 'react'
import { useNavigate } from 'react-router-dom'

function DetailPokemon() {

    // const { id } = useParams

    const navigate = useNavigate();

    const onNavigateBack = () => {
        return navigate(-1)
    }

    return (
        <div>
            <div>You are in DetailPokemon</div>
            <button onClick={onNavigateBack}>
                Back
            </button>
        </div>
    )
}

export default DetailPokemon