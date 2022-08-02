import React from 'react'

const PokeCard = ({ image, name, type }) => {
    return (
        <div>
            <div>
                <img src={image} width="400px" height="250px" alt='Pokemon' />
            </div>
            <div>
                <h1>{name}</h1>
            </div>
            <div>
                <h1>{type}</h1>
            </div>
        </div>
    )
}

export default PokeCard