import React from 'react';
import Particles from 'react-particles-js';

const particlesOptions = {
    particles: {
        number: {
            value: 200,
            density: {
                enable: true,
                value_area: 800

            }
        }
    }
}

const Rank = () => {
    return (
        <div>
            <Particles className="particles" params={particlesOptions}/>

            <div className="white f3">
            {'Nick, your current rank is...'}
            </div>
            <div className="white f1">
            {'#5'}
            </div>
        </div>
    );
}

export default Rank;