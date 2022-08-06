import React from "react";
import './Background.css';
import src from './video.mp4';
import img from './img.png';
import { useNavigate } from "react-router-dom";

const Background = () => {

    const navigate = useNavigate();
    const handleLogo = () => {
        navigate('/');
    };

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
            <video autoPlay loop muted className="videoContainer">
                <source
                src={src}
                type="video/mp4"
                />
            </video>
        </>
    )
};

export default Background;