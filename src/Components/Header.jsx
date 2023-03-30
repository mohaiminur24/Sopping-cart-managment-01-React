import React from 'react';

const Header = () => {
    return (
        <div className='w-full bg-yellow-900 h-16'>
            <div className='w-4/5 h-full items-center text-white mx-auto flex justify-between'>
            <h1 className='font-bold text-2xl'>Mohai<span className='text-yellow-500'>Minur</span></h1>
            <div>
                <ul className='flex gap-5 items-end mr-24 cursor-pointer'>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>Offer</li>
                    <li>Premium</li>
                    <li>Contact us</li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </li>
                </ul>
            </div>
            
            </div>
        </div>
    );
};

export default Header;