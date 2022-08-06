import React, { useEffect, useState } from "react";
import './Products.css';
import { useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Background from '../Background/Background';

const Products = () => {

    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const { contract, provider } = useSelector((state) => state.abi);
    const [id, setId] = useState(0);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const handleDataClose = () => setShowData(false);
    const handleDataShow = (id) => {
        setShowData(true);
        setId(id);
    }
    
    const handleStatusClose = () => setShowStatus(false);
    const handleStatusShow = (id) => {
        setShowStatus(true);
        setId(id);
    }
    const [temp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');
    const [location, setLocation] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const val = await contract.getProducts();
                setData(val);
                setStatus(true);
            } catch(err) {
                console.log('error');
                setError('Error while loading products');
            }
        })();
    }, []);

    const submitAddData = async (event) => {
        event.preventDefault();
        try {
            await contract.AddData(temp, humidity, id)
            .then(async (data) => {
                provider.waitForTransaction(data.hash)
                .then((data) => {
                    console.log(data.status);
                    setId(0);
                    setHumidity('');
                    setTemp('');
                    handleDataClose();
                })
            })
        } catch(err) {
            console.log(err);
            console.log('error');
        }
    }

    const submitAddStatus = async (event) => {
        event.preventDefault();
            console.log(id);
            await contract.AddStatus(location, temp, humidity, id, quantity)
            .then(async (data) => {
                provider.waitForTransaction(data.hash)
                .then((data) => {
                    console.log(data.status);
                    setId(0);
                    setLocation('');
                    setQuantity('');
                    setHumidity('');
                    setTemp('');
                    handleStatusClose();
                })
            })
        
    }

    return(
        <>
        <Background />
        {
            status ===  false ?
            <Box sx={{ display: 'flex', zIndex: '2000', top: '50%', position: 'fixed', left: '50%' }}>
                <CircularProgress />
            </Box>
            :
            
            error === '' ? 
                <div className="productsContainer">
                    {
                        data.map((val, ind) => {
                            const id = parseInt(val.id._hex);
                            return(
                                <span className="productContainer" key={ind}>
                                    <span className="imgContainer" style={{ backgroundImage: `url(${val.imageuri})`}} onClick={() =>navigate(`/product/${id}`)} />
                                    <div className="productDataContainer">
                                        <div className="listName">
                                            {val.name}
                                        </div>
                                        <div>
                                            <span>
                                                Product Id:   
                                            </span>
                                            <span>
                                                {"   " +id}
                                            </span>
                                        </div>
                                        <div className="productDes">
                                            {val.description}
                                        </div>
                                        <div className="productManC">
                                            <span className="productManText">
                                                Manufacturer -   
                                            </span>
                                            <span className="productManVal">
                                                {"  " + val.manufacturing}
                                            </span>
                                        </div>
                                        <div className="productDataBtn">
                                            <Button onClick={() =>handleDataShow(id)}>Add Data</Button>
                                        </div>
                                        <div className="productDataBtn">
                                            <Button onClick={() => handleStatusShow(id)}>Add Status</Button>
                                        </div>
                                    </div>
                                </span>
                            )
                        })
                    }
                </div>
                :
                <div>
                    {error}
                </div>
            }    
        <Modal show={showData} onHide={handleDataClose} className="modalShowContainer">
            <Modal.Header closeButton>
            <Modal.Title>Add Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-2" controlId="formBasicTemp">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control type="text" placeholder="Enter product temperature" value={temp} onChange={(event) => setTemp(event.target.value)} />
                    <Form.Text className="text-muted">Please add temp. in Celsius</Form.Text>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicHumidity">
                    <Form.Label>Humidity</Form.Label>
                    <Form.Control type="text" placeholder="Enter product humidity" value={humidity} onChange={(event) => setHumidity(event.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(event) => submitAddData(event)}>
                    Add Data
                </Button>
            </Form>
            </Modal.Body>
        </Modal>


        <Modal show={showStatus} onHide={handleStatusClose} className="modalShowContainer">
        <Modal.Header closeButton>
          <Modal.Title>Add Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
                <Form.Group className="mb-2" controlId="formBasicLoc">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter product location" value={location} onChange={(event) => setLocation(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicTemp">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control type="text" placeholder="Enter product temperature" value={temp} onChange={(event) => setTemp(event.target.value)} />
                    <Form.Text className="text-muted">Please add temp. in Celsius</Form.Text>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicHumidity">
                    <Form.Label>Humidity</Form.Label>
                    <Form.Control type="text" placeholder="Enter product humidity" value={humidity} onChange={(event) => setHumidity(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="Enter quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(event) => submitAddStatus(event)}>
                    Add Status
                </Button>
            </Form>
        </Modal.Body>
      </Modal>
        </>
    )
};

export default Products;