import React from 'react'

const SmallLoader = () => {
    return (
        <div>
           
            <div className="spinner-grow text-danger mr-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning  mr-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info  mr-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
           
        </div>
    )
}

export default SmallLoader
