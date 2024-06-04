import React from 'react';
import Image from 'next/image';


const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen  bg-opacity-80">
            <Image src="/f1.gif" alt="Loading..." width={100} height={100} />
            <p className="mt-4 text-lg text-blue-500">Loading...</p>
        </div>
    );
};

export default Loading;
