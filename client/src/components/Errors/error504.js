import React from 'react';
import { Link } from 'react-router-dom';

const Error504 = () => {

    return (
        <div className="nk-body bg-white npc-general pg-error">
            <div className="nk-app-root">
                <div className="nk-main ">
                    <div className="nk-wrap nk-wrap-nosidebar">
                        <div className="nk-content ">
                            <div className="nk-block nk-block-middle wide-md mx-auto">
                                <div className="nk-block-content nk-error-ld text-center">
                                    <img className="nk-error-gfx" src="./images/gfx/error-504.svg" alt="" />
                                    <div className="wide-xs mx-auto">
                                        <h3 className="nk-error-title">Gateway Timeout Error</h3>
                                        <p className="nk-error-text">We are very sorry for inconvenience. It looks like some how our server did not receive a timely response.</p>
                                        <Link to="/dashboard" className="btn btn-lg btn-primary mt-2">Back To Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error504;