import React from 'react';
import './loader.css'; // Import your CSS file

export default function MainLoader() {
    return (
        <div className='body'>
            <div id="loader-container">
                <p id="loadingText">Loading</p>
            </div>
        </div>
    );
}