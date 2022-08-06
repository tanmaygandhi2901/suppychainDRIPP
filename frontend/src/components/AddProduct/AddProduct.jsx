import React, { useState } from "react";
import './AddProduct.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from "react-redux";
import { ethers } from 'ethers';
import { getImgUrl } from './ipfs';
import Background from '../Background/Background';

const AddProduct = () => {

    const { contract, provider } = useSelector((state) => state.abi);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [wallet, setWallet] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = await getImgUrl(file);
        await provider.send('eth_requestAccounts', []);
        await contract.AddProduct(name, description, manufacturer, wallet, url)
        .then(async (data) => {
            provider.waitForTransaction(data.hash)
            .then((data) => {
                console.log(data.status);
                setName('');
                setManufacturer('');
                setDescription('');
                setWallet('');
                setFile('');
            })
            .catch((err) => {
                console.log(err);
            })
        })
    }

    return(
        <>
            <Background />
            <div className="addProduct">
                <div>
                    <span className="addProductText">Add a Product: </span>
                </div>
                <Form>
                    <Form.Group className="mb-2" controlId="formBasicProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter product name" value={name} onChange={(event) => setName(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicManufacturerName">
                        <Form.Label>Manufacturer Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter manufacturer name" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicWorkerAddressName">
                        <Form.Label>Worker wallet address</Form.Label>
                        <Form.Control type="text" placeholder="Enter wallet address" value={wallet} onChange={(event) => setWallet(event.target.value)} />
                        <Form.Text className="text-danger">
                            Add wallet address of the moderator (one of update the status of product.)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter description" rows={2} value={description} onChange={(event) => setDescription(event.target.value)}  />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control type="file" onChange={(event) => setFile(event.target.files[0])} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={(event) => handleSubmit(event)}>
                        Add Product
                    </Button>
                </Form>
            </div>
        </>
        
    )
};

export default AddProduct;