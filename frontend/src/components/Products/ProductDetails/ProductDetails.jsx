import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import './ProductDetails.css';
import { useNavigate } from "react-router-dom";
import img from '../../Background/img.png';

const ProductDetails = () => {

    const params = useParams();
    const { contract, provider } = useSelector((state) => state.abi);
    const { id } = params;
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([]);
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const handleLogo = () => {
        navigate('/');
    };

    useEffect(() => {
        (async () => {
            try {
                const data = await contract.products(id);
                console.log(JSON.stringify(data));
                setProduct(data);
                const statusData = await contract.getProductStatus(id);
                console.log(JSON.stringify(statusData));
                setStatus(statusData);
                const dataProduct = await contract.getProductData(id);
                console.log(JSON.stringify(dataProduct));
                setData(dataProduct);
            } catch(err) {
                console.log(err);
                console.log('error');
            }
        })();
    }, []);

    return(
        <>
        <div className="landingHeader">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <span className="navbar-brand logoC" onClick={handleLogo}><img src={img} alt="Logo" width="60" height="40" />
                        <span className="logoText">DRIPP</span>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0" /> 
                    <button className="btn btn-outline-success" style={{fontWeight: '700', marginRight: '8px' }} onClick={() => navigate('/add')}>Add a Product</button>
                    </div>
                </div>
            </nav>
        </div>
        <div className="videoContainer2" />
        <div className="productDetailContainer">
            <div className="productImgDetailsContainer">
                <div className="proImgContainer">
                    <img src={product[5]} alt="Image" />
                </div>
                <div className="productNameContainerDetail">
                    <span className="productNameContainerDetails">
                        Product Name - 
                    </span>
                    <span className="productNameContainerDetailText">
                        {product[1]}
                    </span>
                    <div style={{fontSize: '14px'}}>
                        <span>
                            Manufacturer Name - 
                        </span>
                        <span>
                            {product[3]}
                        </span>
                    </div>
                    <div style={{fontSize: '14px'}}>
                        Product Id - 
                        <span>
                        {parseInt(product[0])}
                    </span>
                    </div>
                </div>
                <div className="productDesContainer">
                    <div className="productDesContainerHead"> Description: </div>
                    <span className="productDesText">
                        {product[2]}
                    </span>
                </div>
            </div>
            <div className="productStatusDataContainer">
                <div className="productStatusContainer">
                    <div className="productHeadlines">
                        <span>Status of Product:</span>
                    </div>
                    <div className="timelineProduct">
                        <Timeline position="alternate">
                        {
                            status.map((data, ind) => {
                                const dateString = new Date(parseInt(data[1]._hex) * 1000).toISOString().split('T')[0];
                                const temp = parseInt(data[2]._hex);
                                const humidity = parseInt(data[3]._hex);
                                const quantity = parseInt(data[5]._hex);
                                const location = data[0];
                                console.log(temp, humidity, quantity);
                                return(
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>{`${dateString}, Temperatue: ${temp}, Humidity: ${humidity}, Quantity: ${quantity}, Location: ${location}`}</TimelineContent>
                                    </TimelineItem>
                              )
                            })
                        }
                        </Timeline>
                    </div>                
                </div>
                <div className="productDataContainerDetail">
                    <div className="productHeadlines">
                        <span>Data of Product:</span>
                    </div>
                    <div className="timelineProduct">
                        <Timeline position="alternate">
                        {
                            data.map((val, ind) => {
                                const temp = parseInt(val[0]._hex);
                                const humidity = parseInt(val[1]._hex);
                                return(
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>{`Temperatue: ${temp}, Humidity: ${humidity}`}</TimelineContent>
                                    </TimelineItem>
                              )
                            })
                        }
                        </Timeline>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    )
};

export default ProductDetails;