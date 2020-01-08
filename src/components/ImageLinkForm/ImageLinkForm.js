import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onClickSubmit }) => {
    return (
        <div>
            <p className="f3">{'This App will detect faces in your pictures. Give it a try!'}</p>
            <p className="f3">{'Copy Image URL. Paste into Searchbox. Click Detect'}</p>
            <p>{'https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg'}</p>
            <p>{'Try Your Own URLs!'}</p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input 
                        className="w-70 center f4 pa2" 
                        type='text' 
                        onChange={onInputChange}
                    />
                    <button 
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                        onClick={onClickSubmit}
                    > 
                    Detect
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;