import React from 'react'
const BlogCardComponent = ({ data }) => {
    return (

        <>

            <div className=' p-3 bg-none' style={{ maxWidth: "450px", overflow: 'hidden' }}>
                <div className='' style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={`https://hopeplants.s3.ap-south-1.amazonaws.com${data.image}`} alt="" className='card-img-top img-fluid' />
                </div>

                <div>
                    <h1 className='fontSmall'>{data.title}</h1>
                    <p>{`Author: ${data.author}`}</p>
                    {/* <p>{` ${data.subTitle}`}</p> */}
                  

                </div>
            </div>
        </>
    )
}

export default BlogCardComponent
