import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPotsSuggestions } from '../actions/potsActions'
import PotsCard from './PotsCard'

const PotsYouMightLikeComponent = () => {
    const dispatch = useDispatch()
    const { pots } = useSelector(state => state.potsSuggestions)
    useEffect(() => {
        dispatch(getPotsSuggestions())
    }, [dispatch])
    return (
        <div className='container-fluid'>
            <h1>Pots You Might Like</h1>
            <div className='row'>
                {pots.map((x) =>
                    <div className="col-6 col-md-3 p-md-3 p-1 ">
                        <PotsCard data={x} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PotsYouMightLikeComponent
