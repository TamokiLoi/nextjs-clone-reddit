import React from 'react';
import Header from './Header.component';

const Template = ({ children }: any) => {

    return (
        <div className="h-screen overflow-y-scroll bg-slate-200">
            <Header />

            <main>{children}</main>
        </div>
    )
}

export default Template;