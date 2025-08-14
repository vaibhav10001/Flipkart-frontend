import React from 'react'
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const products = product

    return (
        <>
            <div className="border border-white p-1 lg:w-[250px] md:w-[150px] sm:w-[130px] w-[100px] flex justify-center items-center flex-col rounded-lg shadow-xl cursor-pointer hover:scale-110" onClick={() => navigate("/ProductDetail", { state: { products } })}>
                <img
                    src={product.thumbnail || fallbackImage}
                    alt={product.title}
                    className='rounded-[8px] text-center lg:w-1/2 lg:h-1/2'
                />
                <h3 className='font-semibold lg:text-md text-[10px] text-center'>{product.title}</h3>
                <p className='font-bold lg:text-lg text-[15px] text-center'>${product.price}</p>
            </div>

        </>
    )
}
export default ProductCard
