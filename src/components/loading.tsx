import React from "react";
import lottieLoading from "../static/lottie/loading.json";
import Lottie from "lottie-react";

const LoadingSquareSpin = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center">
            <Lottie
                animationData={lottieLoading}
                loop={true}
                className="w-[80px] h-[80px]  object-cover"
            />
        </div>
    );
};

export default LoadingSquareSpin;
