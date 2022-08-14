import React from 'react'

function Pagination({ pokemonsPerPage, allPokemons, paginado, currentPage }) {

    const pageNumbers = [];
    let totalPages = 0


    for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
        totalPages++
    }

    return (
        <nav>
            <ul className='button-page' >
                {
                    pageNumbers && pageNumbers.map(number => {
                        return <li className='number' key={number} >
                            <button onClick={() => { paginado(number) }} >{number}</button>
                        </li>
                    })
                }
            </ul>


            <div>
                <div className="previous">{
                    currentPage <= 1 ? null : <button onClick={() => paginado(currentPage - 1)}>Previous</button>
                }
                </div>
                <div className="number-of-page">
                    <span>Page:</span>
                    {currentPage} of {totalPages}
                </div>
                <div className="next">
                    {currentPage >= pageNumbers.length ? null : <button onClick={() => paginado(currentPage + 1)}>Next</button>}
                </div>
            </div>




        </nav>
    )
}

export default Pagination