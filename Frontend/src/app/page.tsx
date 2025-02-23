'use client'


import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {


  const [eventList, seteventList] = useState([]);
  const [numofSeat, setnumofSeats] = useState()


  useEffect(() => {


    fetch('http://localhost:4000/all').then((res) => res.json()).then((data) => seteventList(data?.data))

    // console.log('data',data)


  }, [])

  const booknow = (id , numofseats ,actualSeats) => {


    if(numofseats > actualSeats){

      prompt('enter less')

      return;

    }

    fetch('http://localhost:4000/book',{
      method:"POST",
      // body:{}
    })


  }




  return (
    <>
      <div>
        <h1 style={{ padding: "20px 40px", fontWeight: "bolder" }}>Event List</h1>
        <ul>
          {
            eventList.map((item, index) => (
              <li>

                <span style={{ margin: "40px 60px" }}>Event Name : {item?.eventName}</span>
                <span style={{ margin: "40px 60px" }}>Total Seats : {item?.totalSeats}</span>
                <span><input type="number" placeholder="Enter seats" value={numofSeat} /></span>
                <button onClick={() => booknow(item?._id, numofSeat , item?.totalSeats)} style={{ backgroundColor: "green", color: "whitesmoke", borderRadius: "8px" }}>Book Now</button>

              </li>




            ))
          }
        </ul>
      </div >
    </>
  );
}
