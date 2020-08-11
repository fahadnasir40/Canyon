import React from 'react';
import {Link} from 'react-router-dom';

const Error=()=>{

    return(
        
        <div class="nk-body bg-white npc-general pg-error">
            <div class="nk-app-root">
            <div class="nk-main ">
                <div class="nk-wrap nk-wrap-nosidebar">
                    <div class="nk-content ">
                        <div class="nk-block nk-block-middle wide-xs mx-auto">
                            <div class="nk-block-content nk-error-ld text-center">
                                <h1 class="nk-error-head">404</h1>
                                <h3 class="nk-error-title">Oops! Why you’re here?</h3>
                                <p class="nk-error-text">We are very sorry for inconvenience. It looks like you’re try to access a page that either has been deleted or never existed.</p>
                                <a href="/dashboard" class="btn btn-lg btn-primary mt-2">Back To Home</a>
                            </div>
                        </div>
                    </div>
                
                </div>
            
            </div>
         </div>
        </div>
    )
}

export default Error;