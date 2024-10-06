import React from 'react'
import "./Order.css"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { assets } from "../../assets/assets"

const Order = ({ url }) => {
  const [data, setData] = useState([])

  const fetchAllOrder = async () => {
    const response = await axios.get(`${url}/api/order/get-all-order`)
    setData(response.data.order)
  }

  const changeStatusHandler=async(event ,orderId)=> {
    const response =await axios.post(url+"/api/order/update-status",
      { 
      status:event.target.value ,
      orderId
    })
    if(response.data.success){
     await fetchAllOrder()
    }
  }
  useEffect(() => {
    fetchAllOrder()
  }, [])
  return (
    <div className="orders add">
      <h2>Order Page</h2>
      <div className="order-list">
        {
          data.map((order, index) => {
            return (
              <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className="order-item-food">
                    {
                      order.items.map((item, index) => {
                        if (index === item.length - 1) {
                          return item.name + " x " + item.quantity
                        } else {
                          return item.name + " x " + item.quantity + " , "
                        }
                      })
                    }

                  </p>
                  <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                  <div className="order-item-address">
                    <p >{order.address.street}</p>
                    <p >{order.address.city + " " + order.address.state + " " + order.address.country + " " + order.address.zip_code}</p>

                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p>Items : {order.items.length}</p>
                <p className="order-amount">${order.amount}.00</p>
                <select name="status" id="" onChange={(e)=>changeStatusHandler(e,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Deliverd">Deliverd</option>
                </select>
              </div>



            )
          })
        }
      </div>

    </div>
  )
}

export default Order
