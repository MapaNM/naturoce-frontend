
import { useEffect, useState } from "react"
import Paginator from "../../components/paginator";
import axios from "axios";
import toast from "react-hot-toast";


export default function OrderAdminPage(){
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [popupVisible, setPopupVisible] = useState(false);
    const [clickedOrder, setClickedOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState("pending");
    const [orderNotes, setOrderNotes] = useState("");


    useEffect( ()=>{
        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/orders/" + page + "/" + limit,{
                headers: {
                   Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            .then((res)=>{
                setOrders(res.data.orders);
                setTotalPages(res.data.totalPages);
                setLoading(false);
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }, [loading,page,limit]);
    return(
        <div className="w-full h-full flex flex-col justify-between">
            <table className="w-full border-[3px]">
                <thead>
                    <tr>
                        <th className="p-[10px]">Order ID</th>
                        <th className="p-[10px]">E-mail</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Address</th>
                        <th className="p-[10px]">Phone</th>
                        <th className="p-[10px]">Status</th>
                        <th className="p-[10px]">Date</th>
                        <th className="p-[10px]">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index)=>{
                        return(
                            <tr key={index} className="text-center border-t-[1px] hover:bg-blue-600 hover:text-white" 
                            onClick={()=>{
                                setOrderStatus(order.status);
                                setOrderNotes(order.notes);
                                setClickedOrder(order);
                                setPopupVisible(true);
                            }}>
                                <td className="p-[10px]">{order.orderID}</td>
                                <td className="p-[10px]">{order.email}</td>
                                <td className="p-[10px]">{order.name}</td>
                                <td className="p-[10px]">{order.address}</td>
                                <td className="p-[10px]">{order.phone}</td>
                                <td className="p-[10px]">{order.status}</td>
                                <td className="p-[10px]">{new Date(order.date).toLocaleDateString("en-US")}</td>
                                <td className="p-[10px] text-end">{order.total.toFixed(2)}</td>
                            </tr>
                        )
                    })} 
                </tbody>

            </table>
            {
  popupVisible && clickedOrder && (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-[600px] max-h-[90vh] bg-white rounded-2xl shadow-lg relative p-6">

       {(orderStatus!=clickedOrder.status || orderNotes!=clickedOrder.notes) && <button className=" absolute top-2 right-2  bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400 "
       onClick={async()=>{
        setPopupVisible(false);
        try{
          await axios.put(import.meta.env.VITE_BACKEND_URL + "/orders/" + clickedOrder.orderID,
            {
              status: orderStatus,
              notes: orderNotes
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          toast.success("Order updated successfully");
          setLoading(true);
        }catch(err){
          console.log(err);
          toast.error("Update order failed");
        }
       }}
       >
            Save changes
        </button>}

        {/* Close Button */}
        <button
          className="absolute w-[30px] h-[30px] bg-red-600 border-2 border-red-600 text-white top-[-20px] right-[-20px] rounded-full flex items-center justify-center cursor-pointer hover:bg-transparent hover:text-red-600 transition"
          onClick={() => setPopupVisible(false)}
        >
          X
        </button>

        {/* Order Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Order Details
        </h2>

        {/* Basic Info */}
        <div className="space-y-2 mb-4 text-sm">
          <p><span className="font-semibold">Order ID:</span> {clickedOrder.orderID}</p>
          <p><span className="font-semibold">Name:</span> {clickedOrder.name}</p>
          <p><span className="font-semibold">Email:</span> {clickedOrder.email}</p>
          <p><span className="font-semibold">Phone:</span> {clickedOrder.phone}</p>
          <p><span className="font-semibold">Address:</span> {clickedOrder.address}</p>
           
    
          <p><span className="font-semibold">Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium 
              ${clickedOrder.status === "pending" ? "bg-yellow-100 text-yellow-700" :
              clickedOrder.status === "completed" ? "bg-green-100 text-green-700" :
              "bg-gray-100 text-gray-700"}`}>
              {clickedOrder.status}
            </span>
            <select className="ml-4 p-1 border rounded" value={orderStatus}
            onChange={(e)=> setOrderStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>

            </select>
          </p>
          <p className="text-sm text-gray-800 mb-2">
            <span className="font-semibold">Notes:</span> {clickedOrder.notes || "None"}
          </p>
          <textarea className="w-full h-[50px] p-2 border rounded mt-2" 
          value={orderNotes}
          onChange={(e)=> setOrderNotes(e.target.value)}>

          </textarea>
          <p><span className="font-semibold">Date:</span> {new Date(clickedOrder.date).toLocaleString()}</p>
        </div>
        {/* Notes & Total */}
         <p className="mb-2 border-b pb-2"><span className="font-semibold">Total:</span> Rs.{clickedOrder.total.toLocaleString("en-US", {minimumFractionDigits: 2})}</p>

        {/* Items Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
          Ordered Items
        </h3>
        <div className="space-y-3 max-h-[100px] overflow-y-auto">
          {clickedOrder.items?.map((item, index) => (
            <div
              key={item._id || index}
              className="flex items-center border rounded-lg p-3 shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover mr-4"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Product ID: {item.productID}</p>
                <p className="text-sm text-gray-600">Qty: {item.qty}</p>
              </div>
              <div className="text-right font-semibold text-gray-800">
               Rs.{item.price.toLocaleString("en-US", {minimumFractionDigits: 2})}
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  )
}


            <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading}/>

        </div>
    );
   
}