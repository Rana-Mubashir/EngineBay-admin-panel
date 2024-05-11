import React from 'react';

function Loader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-8 border-t-transparent border-black"></div>

        </div>
    );
}

export default Loader;
