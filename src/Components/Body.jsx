import React, { useEffect, useState } from 'react';
import Product from './Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import CartModal from './CartModal';

const Body = () => {
    const fillstar = <FontAwesomeIcon icon={faTrashCan}/>
    const fillrev = <FontAwesomeIcon icon={faMagnifyingGlass}/>
     
    const [product, setProduct] = useState([]);
    const [seeallbutton, setSeeall] = useState(false);
    const [updatelocal ,Setlocalstorage] = useState();
    const [localdatafetching, setLocaldatafetching] = useState(false);
    const [updatecart,setupdatecart] = useState(false);
    const [localdatafromproduct,setLocaldatafromproduct] = useState();
    
    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json').then(res => res.json()).then(data => setProduct(data))
    },[]);

    useEffect(()=>{
        const localstoragedata = localStorage.getItem('cartitems');
        const localstoragedataparse = JSON.parse(localstoragedata);
        Setlocalstorage(localstoragedataparse);
    },[localdatafetching,updatecart])

    let totalitems = 0;
    let totalprice = 0;
    let shippingcost = 0;
    let totalTax =0;
    let GrandTotal = 0;
    if(updatelocal){
        totalitems = updatelocal.reduce((prev,current)=> prev + current.qunatity,0);
        totalprice = updatelocal.reduce((prev,current)=> prev + current.price,0);
        shippingcost = updatelocal.reduce((prev,current)=> prev + current.cost,0);
        totalTax = totalprice*0.5/100;
        GrandTotal = totalprice+shippingcost+totalTax;
    };

    const setitemsinCart = (id,price,shipping,name) => {
        let cartitems;
        const getitems = localStorage.getItem('cartitems');
        if(getitems){
            const parseitem = JSON.parse(getitems);
            const findout = parseitem.find(x=>x.item == id);
            if(findout){
                const newQunatity = findout.qunatity+1;
                const filternewarray = parseitem.filter(x=> x.item != findout.item);
                const updateitem = findout.item;
                const update = [...filternewarray,{item:updateitem,name:name,qunatity:newQunatity,price:price*newQunatity,cost:shipping}];
                const updatestring = JSON.stringify(update);
                localStorage.setItem('cartitems',updatestring);
                setLocaldatafetching(!localdatafetching);
                return;
            };
            const newitems = [...parseitem,{item:id,qunatity:1,price:price,cost:shipping,name:name}];
            const newitemsstring = JSON.stringify(newitems);
            localStorage.setItem('cartitems',newitemsstring);

        }else{ 
            cartitems = [{item:id,qunatity:1,price:price,cost:shipping,name:name}];
            const newitems = JSON.stringify(cartitems);
            localStorage.setItem('cartitems',newitems);
        }
        setLocaldatafetching(!localdatafetching);
    };

    const localStoragess = () =>{
        localStorage.clear();
        setupdatecart(!updatecart);
    }

    // functionality for modal

    const modaldatafromproduct = () =>{
            const getdataFromLocalstorage = JSON.parse(localStorage.getItem('cartitems'));
            if(getdataFromLocalstorage){
                let localdatafromProduct=[];
                for(let i=0; i<getdataFromLocalstorage.length;i++){
                
                    const finddata = product.find(x=>x.id == getdataFromLocalstorage[i].item);
                    if(finddata){
                        localdatafromProduct.push(finddata);
                    };

                    setLocaldatafromproduct(localdatafromProduct);
    
                };
            };
        };

    return (
        <>
        <div className='w-11/12 mx-auto my-10 gap-5 grid grid-cols-5'>
            <div className='col-span-4 grid grid-cols-3 gap-5'>{product && product.slice(0,seeallbutton == true ?product.length:15).map(item=><Product key={item.id} setProduct ={setitemsinCart} product={item}></Product>)}</div>

            <div className='border rounded-md p-5 h-fit sticky top-5'>
                <h1 className='text-center border-b pb-2 text-sm font-semibold text-yellow-700 mb-5'>Your Cart Summary</h1>
                <h1 className='font-bold'>Total items: <span className='ml-5 font-thin'>{totalitems}</span></h1>
                <h1 className='font-bold'>Total Price: <span className='ml-5 font-thin'>{totalprice.toFixed(2)}</span></h1>
                <h1 className='font-bold'>Shipping Cost: <span className='ml-5 font-thin'>{shippingcost.toFixed(2)}</span></h1>
                <h1 className='font-bold'>Tax: <span className='ml-5 font-thin'>{totalTax.toFixed(2)}</span></h1>
                <h1 className='font-bold border py-2 text-yellow-900 text-center mt-5 mb-5'>Grand Total: <span className='ml-1'>{GrandTotal.toFixed(2)}</span> USD</h1>
                <button className='w-full text-center bg-red-800 rounded-md my-3 py-2 text-sm text-white' onClick={()=>localStoragess()}>Clear Cart <span className='text-sm'>{fillstar}</span></button>

                <label htmlFor="my-modal-5" className='w-full block text-center bg-yellow-800 rounded-md py-2 text-sm text-white' onClick={()=> modaldatafromproduct()}>Review order <span>{fillrev}</span></label>
                
            </div>
        </div>
        
        {  !seeallbutton &&
            <div className='w-full text-center my-10'><button onClick={()=> setSeeall(true)} className='px-5 p-2 text-sm bg-yellow-600 hover:bg-yellow-700 text-white rounded-md shadow-md'>See More</button></div>
        }

        <CartModal setlocaldata = {Setlocalstorage} localdata ={updatelocal ? updatelocal: []}/>

        </>
    );
};

export default Body;