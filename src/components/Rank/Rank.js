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

const Rank = ({ name, entries }) => {
    return (
        <div>
            <Particles className="particles" params={particlesOptions}/>
            <div className="white f3">
                {`${name}, your current entry count is...`}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    );
}

export default Rank;