import React from 'react'

function Pagination({ pokemonsPerPage, allPokemons, paginado, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {/* <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginado(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul> */}
            <div>
                <div className="previous">{
                    currentPage <= 1 ? null : <button onClick={() => paginado(currentPage - 1)}>Previous</button>
                }
                </div>
                <div className="number-of-page">
                    <span>Page:</span>
                    {currentPage} of {4}
                </div>
                <div className="next">
                    {currentPage >= 4 ? null : <button onClick={() => paginado(currentPage + 1)}>Next</button>}
                </div>
            </div>
        </div>
    )
}

export default Pagination