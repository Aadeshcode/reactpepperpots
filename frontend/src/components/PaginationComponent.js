import React from 'react'

const PaginationComponent = ({ pages,page, setPageNumber, pageNumber }) => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col text-center'>
                    <ul className='p-0'>
                        {pageNumber > 1 ?
                            <li className='fontPBold' onClick={() => setPageNumber(page - 1)}>Prev </li>
                            : " "}
                        {[...Array(pages).keys()].map((x) => (

                            <li className='fontPBold px-3' key={x + 1} style={pageNumber === x + 1 ? { borderBottom: '1px solid black' } : {}}
                                onClick={() => setPageNumber(x + 1)}
                            >
                                {x + 1}
                            </li>

                        ))}
                        {pageNumber === pages ? "" :
                            <li className='fontPBold' onClick={() =>

                                setPageNumber(Number(page) + 1)
                            }>Next </li>
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default PaginationComponent
