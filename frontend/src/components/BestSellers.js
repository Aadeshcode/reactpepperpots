import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopProducts } from '../actions/productActions'
import ProductCard from './ProductCard'
import SmallLoader from './SmallLoader'

const BestSellers = () => {

    const dispatch = useDispatch()
    const { loading, products } = useSelector(state => state.topProducts)
    useEffect(() => {
        dispatch(getTopProducts())
    }, [])
    return loading ? <SmallLoader /> : (
        <div className='container-fluid'>
            <div>
                <h1 className='display-4 p-3'>Our BestSellers</h1>
            </div>
            <div className='row'>
                {products.map((x) =>
                    <div className='col-6 col-md-3'>
                        <ProductCard data={x} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default BestSellers
