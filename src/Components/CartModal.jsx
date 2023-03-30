
const CartModal = (props) => {
    const setlocaldata = props.setlocaldata;
    const localdata = props.localdata;
    
    function Deleteitems(id){
        const getitems = JSON.parse(localStorage.getItem('cartitems'));
        const findoutdata = getitems.find(x=> x.item == id);
        if(findoutdata.qunatity >1){
            const filterData = getitems.filter(x=> x.item != id);
            const newdata = [...filterData,{item:findoutdata.item,qunatity:findoutdata.qunatity-1,price:findoutdata.price,cost:findoutdata.cost,name:findoutdata.name}]
            const newdatastring = JSON.stringify(newdata);
            localStorage.setItem('cartitems',newdatastring);
            setlocaldata(newdata);
            return;
        }
        const filterData = getitems.filter(x=> x.item != id);
        const filterdatastring = JSON.stringify(filterData);
        localStorage.setItem('cartitems',filterdatastring);
        setlocaldata(filterData);
    };

    return (
        <>
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 h-auto max-w-5xl">

                    <h1 className='text-center font-bold border-b pb-3 mb-5'>Review your Cart</h1>

                    <table className='table-fixed w-full text-center'>
                        <thead className='text-lg'>
                            <tr className='font-bold'>
                                <td className="text-left">Product name</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                            {localdata==0 && <h1 className='text-3xl absolute left-0 right-0 top-16 text-red-600 font-bold'>NO Data Found!</h1>}
                            
                            
                                {
                                    localdata.map(x=>{
                                            return(
                                                <>
                                                <tr>
                                                    <td className='font-bold text-left'>{x.name}</td>
                                                    <td className='font-bold'>{x.qunatity}</td>
                                                    <td>{x.price}</td>
                                                    <td><button className='bg-yellow-600 px-5 py-2 rounded-md text-white my-2' onClick={()=>Deleteitems(x.item)}>Delete Item</button></td>
                                                </tr>
                                                </>
                                            );
                                    })
                                }
                                
                            
                            
                        </tbody>
                    </table>

                

                
                <div className="modal-action">
                <label htmlFor="my-modal-5" className='cursor-pointer absolute top-3 text-yellow-800 right-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </label>
                </div>
            </div>
            </div>
            
        </>
    );
};

export default CartModal;