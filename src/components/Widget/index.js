import React from 'react';
import'./style.css';
import AddBoxIcon from '@material-ui/icons/AddBox';

function Widget() {
    return (
        <>
        
        <div className="widgets">
            <iframe 
            src="https://elfsight.com/facebook-feed-widget/create/"
            width="340"
            height="100%"
            scrolling="yes"
            frameBorder="0"
            allowTransparency="True"
            style={{border: "none", overflow:"hidden"}}
            allow="encrypted-media"
            >               
            </iframe>
        </div>
        </>
    )
}

export default Widget
