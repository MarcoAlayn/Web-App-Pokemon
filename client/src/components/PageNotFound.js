import React from 'react'
import './PageNotFound.css'
import { useDispatch } from 'react-redux'
import { resetDetail } from '../redux/actions'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onNavigateBack = () => {

        dispatch(resetDetail())
        return navigate(-1)
    }

    return (
        <div className='notFoundContainer'>
            <h1 className='codeHttp'>404</h1>
            <h1 className='notFound'>Page Not Found</h1>
            <div className='detail-container' >
                <button className='buttonBack' onClick={onNavigateBack}>
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default PageNotFound