import React from 'react'
import './Pagination.css'

function Pagination({ pokemonsPerPage, allPokemons, paginado, currentPage }) {

    const pageNumbers = [];
    let totalPages = 0


    for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
        totalPages++
    }

    return (
        <nav className='pagination'>

            <div className="number-of-page">
                <span>Page: </span>
                {currentPage} of {totalPages}
            </div>

            <div className='info'>
                <div >{
                    currentPage <= 1 ? null : <button className={"direction prev"} onClick={() => paginado(currentPage - 1)}>Previous</button>
                }
                </div>
                <div className='button-page' >
                    {
                        pageNumbers && pageNumbers.map(number => {
                            return <div className='number' key={number} >
                                <button className='numberButton' onClick={() => { paginado(number) }} >{number}</button>
                            </div>
                        })
                    }
                </div>
                <div >
                    {currentPage >= pageNumbers.length ? null : <button className={"direction next"} onClick={() => paginado(currentPage + 1)}>Next</button>}
                </div>
            </div>




        </nav>
    )
}

export default Pagination