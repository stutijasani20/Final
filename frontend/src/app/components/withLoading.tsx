"use client";
import React, { ComponentType, useState, useEffect } from 'react';
import Image from 'next/image';
import Loading from '../loading';



interface WithLoadingProps {
    isLoading: boolean;
}


function withLoading<T extends WithLoadingProps>(WrappedComponent: ComponentType<T>) {
    return function WithLoading(props: T) {
        const { isLoading, ...rest } = props;
        const [showLoader, setShowLoader] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }, []);

        if (isLoading || showLoader) {
            return (
                <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-md z-50">
                  <Loading />
                </div>
            );
        }

        return <WrappedComponent {...rest as T} />;
    };
}

export default withLoading;
