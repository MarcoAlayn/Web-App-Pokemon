import React from 'react'

const PokeCard = ({ id, name }) => {
    return (
        <div>
            <div>
                <h1>{name}</h1>
            </div>
            <div>
                <h1>{id}</h1>
            </div>
        </div>
    )
}

export default PokeCard