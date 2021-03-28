import React from 'react'
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form } from "react-bootstrap";
import axios from 'axios'
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addBlogs, getoneBlog, updateBlogs } from '../actions/blogActions';
import SmallLoader from '../components/SmallLoader'
const AdminBlogCreateScreen = ({ history, match }) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState("/sample.jpg");
    const [text, setText] = useState('');
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [uploading, setUploading] = useState(false)

    AdminBlogCreateScreen.modules = {
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
    AdminBlogCreateScreen.formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',

    ]

    const { loading, success } = useSelector(state => state.blogsCreate)
    const { blog, loading: detailsLoading } = useSelector(state => state.blogDetails)
    const { success: updateSuccess, loading: updateLoading } = useSelector(state => state.blogUpdate)
    const uploadFileHandler = async (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const { data } = await axios.post(
                "/api/image/upload",
                formData,
                config
            );
            console.log(data)
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const isEdit = match.params.slug || null
    const createBlog = (e) => {
        e.preventDefault()
        if (isEdit) {
            console.log(blog.slug)
            dispatch(updateBlogs({
                slug: blog.slug,
                text,
                title,
                image,
                subTitle
            }))
        } else {
            dispatch(addBlogs({
                text,
                title,
                image,
                subTitle
            }))
        }
    }

    useEffect(() => {
        if (success) {
            history.push('/admin/blog')
        }
        if (isEdit) {
            dispatch(getoneBlog(match.params.slug))
        }
    }, [success, history, match, dispatch, isEdit])

    useEffect(() => {
        if (blog && isEdit && blog.text) {
            setText(blog.text)
            setTitle(blog.title)
            setSubTitle(blog.subTitle)
            setImage(blog.image)
        }
        if (updateSuccess) {
            history.push('/admin/blog')
        }
    }, [blog, isEdit, updateSuccess , history])

    return loading || updateLoading || detailsLoading ? <SmallLoader /> : (


        <div className='container Blog'>

            <div className='row'>
                <div className='col'>
                    <div class="card">
                        <div class="card-body">
                            <form onSubmit={createBlog}>
                                <div class="form-group">
                                    <label className='fontPSmall'>Post Title</label>
                                    <input type="text" class="form-control" id="blogTitle" placeholder="Enter Title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                    />

                                </div>
                                <div class="form-group">
                                    <label className='fontPSmall'>Post Sub-title</label>
                                    <input type="text" class="form-control" id="blogTitle" placeholder="Enter Title"
                                        onChange={(e) => setSubTitle(e.target.value)}
                                        value={subTitle}
                                    />

                                </div>
                                <div class="form-group">
                                    <label className='fontPSmall'>Post Body</label>
                                    <ReactQuill
                                        modules={AdminBlogCreateScreen.modules}
                                        formats={AdminBlogCreateScreen.formats}
                                        theme='snow'
                                        id='body'
                                        placeholder='Enter your post here. You can type like you do in Ms-Word. You can add list item and embed links'
                                        value={text}
                                        onChange={(e) => setText(e)}
                                    />

                                </div>
                                <div className='form-group' controlId="image">
                                    <label className='fontPSmall'>Image</label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter image url"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></Form.Control>
                                    <Form.File
                                        id="image-file"
                                        label="Choose File"
                                        custom
                                        multiple
                                        onChange={uploadFileHandler}
                                    ></Form.File>
                                    {uploading && <Loader />}
                                </div>
                                <div>
                                    <button class='btn btn-block btn-Greenery' disabled={uploading}>Create Blog</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card p-3'>
                        {title || subTitle || text ? <> <h1>{title}</h1>
                            <p className='fontPBold'>{subTitle}</p>
                            <ReactQuill
                                value={text}
                                readOnly={true}
                                theme={'bubble'}
                            />
                        </> : <p>Preview your Blog Real Time</p>}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default AdminBlogCreateScreen



