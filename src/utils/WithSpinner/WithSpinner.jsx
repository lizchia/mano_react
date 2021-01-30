import React from "react";
import "./withSpinner.styles.scss";


const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    return isLoading ?
        (<div class="loader">Loading...</div>) : (
            <WrappedComponent {...otherProps} />
        )
}


export default WithSpinner;