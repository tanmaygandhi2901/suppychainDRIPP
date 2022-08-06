import React from "react";
import './Landing.css';
import { useNavigate } from "react-router-dom";
import Background from '../Background/Background';

const Landing = () => {
    const navigate = useNavigate();
    const navigateToProducts = () => {
        navigate('/products');
    }

    return(
        <>  
            <Background />
            <div className="landingGradientContainer" />
            <div className="landingTextContainer">
                <div>
                    <span className="landingText">
                        CREATING A TRUST
                        <br />
                        BETWEEN
                        PRODUCER & CONSUMER
                    </span>
                </div>
                <div className="landingProductsContainer">
                    <span className="landingProductsBtn" onClick={navigateToProducts}>
                        Show Products
                    </span>
                </div>
            </div>
        </>
    )
};

export default Landing;