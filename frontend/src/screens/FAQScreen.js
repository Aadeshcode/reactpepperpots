import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFaqs } from '../actions/faqActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import one from '../components/pics/6720.jpg'
const FAQScreen = () => {
    const dispatch = useDispatch()

    const { loading, error, faq } = useSelector(state => state.listFaq)
    useEffect(() => {
        window.scrollTo(0,0)
        dispatch(getFaqs())
    }, [dispatch])
    return loading ? <Loader /> : error ? <Message message={error} /> : (
        <div className="container-fluid">
            <h1 className='fontXBig'>Frequently Asked Questions</h1>
            <div className="p-2">
                <div className="row align-items-center d-none d-md-flex">
                    <div className="col-1">
                        <p className="fontPBold">FAQS</p>
                    </div>
                </div>
            </div>
            <div className='row  mt-4'>
                <div className='col-12 col-md-6'>
                    <div>
                        <img src={one} alt="item" className='img-fluid' />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    {faq.map((x) =>

                        <div className='p-3 bottom-border text-center' key={x._id}>
                            <p className='fontPBold btn' data-toggle="collapse" data-target={`#as${x._id}`} aria-expanded="false" aria-controls="collapseExample">{x.question}</p>
                            <p class="collapse p-3" id={`as${x._id}`}>{x.answer}</p>
                        </div>


                    )}
                </div>
            </div>
        </div>
    )
}

export default FAQScreen
