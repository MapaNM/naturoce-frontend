import { Link } from "react-router-dom";

export default function ProductCard(props){
    const product = props.product;

    return(
        <Link to={"/overview/"+ product.productId} className="w-[300px] h-[400px] shrink-0 flex flex-col shadow-2xl rounded-xl overflow-hidden">
            <img src={product.images[0]} className="object-cover w-full h-[275px]" alt="" />
            <div className="w-full h-[125px] flex flex-col p-[5px]">
                <span className="text-sm text-gray-400">{product.productId}</span>
                <h1 className="text-lg font-semibold">{product.name}</h1>
                {/* <h2 className="text-red-500 font-semibold flex flex-row gap-1"><span className="line-through text-green-500" > Rs.{product.labelledPrice} </span> -  Rs.{product.price}/= </h2> */}
                <div >
                    {
                        product.labelledPrice > product.price ?
                        <h2 className="text-blue-800 font-semibold flex flex-row gap-2"><span className="line-through text-red-500" > Rs.{product.labelledPrice.toLocaleString("en-US", {minimumFractionDigits: 2})} </span>   Rs.{product.price.toLocaleString("en-US", {minimumFractionDigits: 2})} </h2>
                        :
                        <h2 className="text-blue-800 font-semibold flex flex-row"> Rs.{product.price.toLocaleString("en-US", {minimumFractionDigits: 2})} </h2>
                    }
                </div>

            </div>

        </Link>
    )
} 