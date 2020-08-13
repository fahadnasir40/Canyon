import React from 'react';
import {Link} from 'react-router-dom';

const Error504=()=>{

    return(
        
    <div class="nk-body bg-white npc-general pg-error">
        <div class="nk-app-root">
        
            <div class="nk-main ">
           
                <div class="nk-wrap nk-wrap-nosidebar">
                  
                    <div class="nk-content ">
                        <div class="nk-block nk-block-middle wide-md mx-auto">
                            <div class="nk-block-content nk-error-ld text-center">
                                <img class="nk-error-gfx" src="./images/gfx/error-504.svg" alt=""/>
                                <div class="wide-xs mx-auto">
                                    <h3 class="nk-error-title">Gateway Timeout Error</h3>
                                    <p class="nk-error-text">We are very sorry for inconvenience. It looks like some how our server did not receive a timely response.</p>
                                    <a href="/dashboard" class="btn btn-lg btn-primary mt-2">Back To Home</a>
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