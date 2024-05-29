"use client";
import React, { ComponentType, useState, useEffect } from 'react';
import Image from 'next/image';
import { Hourglass } from 'react-loader-spinner';

// Define the props for the withLoading HOC
interface WithLoadingProps {
    isLoading: boolean;
}

// Define the withLoading HOC
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
                    <Hourglass height={100} width={100} />
                </div>
            );
        }

        return <WrappedComponent {...rest as T} />;
    };
}

export default withLoading;
