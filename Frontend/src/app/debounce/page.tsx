'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { debounce } from 'lodash';

const Debouncing = () => {

    const [productlist, setProductlist] = useState([]);
    const [searchtext, setSearchtext] = useState("")


    // const fetchProducts = async (query: any) => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/allproduct?name=${query}`);
    //         const data = await response.json();
    //         console.log('products: ',data)
    //         setProductlist(data?.data);
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     }
    // };

    // const handleChange = (e: any) => {

    //     const value = e.target.value;
    //     setSearchtext(value);
    //     fetchProducts(value);

    // }


    const debouncedFetchProducts = useCallback(
        debounce(async (query:any) => {
          try {
            const response = await fetch(`http://localhost:4000/allproduct?name=${query}`);
            const data = await response.json();
            console.log('products: ', data);
            setProductlist(data?.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        }, 1000), // Adjust the delay as needed (300ms in this example)
        []
      );
    
      const handleChange = (e:any) => {
        const value = e.target.value;
        setSearchtext(value);
        debouncedFetchProducts(value);
      };
    

    return (
        <div>

            <input type="text" value={searchtext} onChange={handleChange} placeholder="Search products..." />
            <ul>

                {
                    productlist?.length > 0 ? <>
                        {
                            productlist.map((item: any, index) => (
                                <li key={item?._id}>{item?.name}</li>
                            ))
                        }
                    </> : <>No data</>
                }

            </ul>

        </div>
    )
}

export default Debouncing
