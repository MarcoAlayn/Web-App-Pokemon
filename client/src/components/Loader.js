import React from 'react'
import loader from '../images/loader.gif'

const Loader = () => {
    return (
        <div className='theLoader'>
            <img src={loader} alt='Loading...' height='100px' width='100px' />
        </div>
    )
}

export default Loader