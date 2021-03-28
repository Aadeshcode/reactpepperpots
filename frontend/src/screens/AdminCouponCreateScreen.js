import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { addCoupons } from "../actions/couponActions";
import Loader from "../components/Loader";
import axios from 'axios'
import Message from "../components/Message";

const AdminCouponCreateScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [onlyForMembers, setOnlyForMembers] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [issuer, setIssuer] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const { loading, error, success } = useSelector(state => state.addCoupon)
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addCoupons({
        code,
        discount,
        expiry,
        giver: issuer,
        description,
        onlyForMembers,
        image
      })
    );
  };

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

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (success) {
      history.push('/admin/coupons')
    }
  }, [success, history])
  return loading ? <Loader /> : error ? <Message message={error} variant='error' /> : (
    <div className="container">
      <FormContainer>
        <h1>Create Coupon Here</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Expiry</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Issuer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the person who will give this Coupon"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Only For Members</Form.Label>
            <Form.Control
              type="checkbox"
              placeholder="Enter Description"
              value={onlyForMembers}
              onChange={(e) => setOnlyForMembers(e.target.checked)}
            ></Form.Control>
          </Form.Group>
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
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </div>
          <button className='btn btn-Greenery p-3' type='submit'>Create</button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AdminCouponCreateScreen;
