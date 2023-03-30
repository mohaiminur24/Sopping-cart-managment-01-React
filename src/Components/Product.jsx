import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
<FontAwesomeIcon icon="fa-regular fa-star" />

const Product = (props) => {
    const fillstar = <FontAwesomeIcon icon={faStar}/>
    const {id,name,price,stock,ratings,ratingsCount,img,shipping} = props.product;
    const setproduct = props.setProduct;
    return (
        <div className='border p-5 rounded-md relative'>
            <img className='border rounded-md mb-3' src={img && img} alt=""/>
            <h1 className='text-lg font-bold'>{name}</h1>
            <p className='font-bold text-2xl'>{ratings}.0 <span className='text-sm text-yellow-400'>{
                Array(ratings).fill().map(x=> <span>{fillstar}</span>)
            }<span className='text-xs ml-2 font-thin text-black'>( {ratingsCount} )</span></span></p>
            <p className='font-semibold my-1'>Shipping Cost: $<span className='text-lg text-yellow-900'>{shipping}</span></p>
            <p><span className='font-semibold'>In Stock:</span> {stock} count</p>
            <p className='flex items-start mt-3 mb-16'>$ <span className='text-3xl font-bold'>{price}</span>00</p>

            <button onClick={()=>setproduct(id,price,shipping,name)} className='py-2 bg-yellow-600 rounded-md font-bold text-white w-11/12 mx-auto absolute bottom-4 left-0 right-0 hover:bg-yellow-700'>ADD to Cart</button>  
        </div>
    );
};

export default Product;