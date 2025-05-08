import ReCAPTCHA from "react-google-recaptcha";
import { useState, useRef } from "react";


export function Captcha(props){
  const useRecaptcha = import.meta.env.VITE_USE_RECAPTCHA === 'true' ? true : false;
  const captchaRef = useRef(null);
  const updateCaptcha = (e) => {
    props.updateToken(captchaRef.current.getValue());
  };
    return(
        <>{useRecaptcha ? <ReCAPTCHA
                    className=""
                    ref={captchaRef}
                    sitekey="6LeBYhkpAAAAABwRVO5QRASROAi0B80JVSs6LHWf"
                    onChange={(e) => updateCaptcha(e)}
                  /> : <br />}
                  </>
    )
}