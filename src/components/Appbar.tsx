import * as React from "react";
import  './Appbar.css';
import videoImage from '../assets/img/video.png'


export const AppBar: React.FC = () => {

    return (
        <>
            <div className="App-bar-header">
                <img className="img-logo" src={videoImage} alt="Video Logo" />
                <div className="Title">Movie Search App</div>
            </div>
        </>
    )

}