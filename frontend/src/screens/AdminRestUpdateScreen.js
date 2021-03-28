import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getRestDetails, updateRest } from '../actions/restActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AdminRestUpdateScreen = ({ match, history, location }) => {
    const createMemberships = match.params.field === 'membership' ? true : false
    console.log(createMemberships)
    const [text, setText] = useState("")
    const [firstPara, setFirstPara] = useState("")
    const [secondPara, setSecondPara] = useState('')
    const [thirdPara, setThirdPara] = useState('')
    const dispatch = useDispatch()
    const { loading, error, rest } = useSelector(state => state.restDetails)
    const { loading: updateLoading, error: updateError, success } = useSelector(state => state.updateRest)
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }
    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',

    ]
    useEffect(() => {
        dispatch(getRestDetails(match.params.field))
    }, [dispatch, match])
    useEffect(() => {
        if (!createMemberships) {
            setText(rest)
        }else{
            setFirstPara(rest.firstPara)
            setSecondPara(rest.secondPara)
            setThirdPara(rest.thirdPara)
        }
    }, [rest, createMemberships])
    useEffect(() => {
        if (success) {
            history.push('/admin/rest')
        }
    }, [success, history])
    const updateHandler = () => {
        if (createMemberships) {
            dispatch(updateRest(match.params.field, { updateData: { firstPara, secondPara, thirdPara } }))
        } else {
            dispatch(updateRest(match.params.field, { updateData: text }))
        }
    }
    return loading || updateLoading ? <Loader /> : error || updateError ? <Message variant='error' message={error} /> : (
        <div className='container'>
            <div className='row justify-content-center'>

                {!createMemberships ? <div className='col-12 col-md-7'>
                    <NavLink to='/admin/rest'><button className=' btn btn-Greenery p-3 mb-3'>Go Back</button></NavLink>
                    <h1>{`Update ${match.params.field}`}</h1>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        theme='snow'
                        id='body'
                        placeholder='Enter your post here. You can type like you do in Ms-Word. You can add list item and embed links'
                        value={text}
                        onChange={(e) => setText(e)}
                    />
                    <button className=' btn btn-block btn-Greenery' onClick={updateHandler}>Update</button>
                </div> : <>

                        <div className='col-12 col-md-7 mb-5'>
                            <NavLink to='/admin/rest'><button className=' btn btn-Greenery p-3 mb-3'>Go Back</button></NavLink>
                            <h1>{`Update ${match.params.field}`}</h1>
                            <h2>{` First Para`}</h2>
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                theme='snow'
                                id='body'
                                placeholder='Enter your post here. You can type like you do in Ms-Word. You can add list item and embed links'
                                value={firstPara}
                                onChange={(e) => setFirstPara(e)}
                            />

                        </div>
                        <div className='col-12 col-md-7 mb-5'>
                            <h2>{` Second Para`}</h2>
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                theme='snow'
                                id='body'
                                placeholder='Enter your post here. You can type like you do in Ms-Word. You can add list item and embed links'
                                value={secondPara}
                                onChange={(e) => setSecondPara(e)}
                            />

                        </div>
                        <div className='col-12 col-md-7'>
                            <h2>{` Third Para`}</h2>
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                theme='snow'
                                id='body'
                                placeholder='Enter your post here. You can type like you do in Ms-Word. You can add list item and embed links'
                                value={thirdPara}
                                onChange={(e) => setThirdPara(e)}
                            />
                            <button className=' btn btn-block btn-Greenery' onClick={updateHandler}>Update</button>
                        </div>

                    </>}
            </div>
        </div>
    )
}

export default AdminRestUpdateScreen
