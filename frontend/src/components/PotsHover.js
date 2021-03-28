import React from 'react'
import { NavLink } from 'react-router-dom'

const PotsHover = ({ image, desc, planter, link }) => {
    return (
        <div className='PotsHover '>
            <div className="card" style={{ width: '18rem' }}>
                <div className="pot_div_hover">
                    <img src={`https://hopeplants.s3.ap-south-1.amazonaws.com${image}`} alt="pot" className="img-fluid rounded" />
                </div>
                <div className="card-body pb-0">
                    <h4 className="card-title">{planter}</h4>
                    <p className="card-text text-truncate">{desc}</p>
                </div>

                <div className="card-body px-0 pb-0">
                    <NavLink exact to={`/product/pot/${link}`}>
                        <button className='btn btn-Greenery btn-block'>See full description</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default PotsHover
