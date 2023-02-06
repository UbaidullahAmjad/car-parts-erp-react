/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideDetector(ref, handleClick) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                if (handleClick) {
                    handleClick();
                }
                // console.log("handleClickOutside called");
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


/**
 * Component that alerts if you click outside of it
 */
/** How to use this Hook?? */
/**
    ************ Usage of Hook in Component **************
    function OutsideAlerter(props) {
        const wrapperRef = useRef(null);
        useOutsideDetector(wrapperRef, () => {

        });
    
        return <div ref={wrapperRef}>{props.children}</div>;
    }
    ******************************************************
 */