import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ProductShop() {
  // State variables
  const [data, setData] = useState([]); // State to store product data fetched from API
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  const [user, setUser] = useState(null); // State to store the current user
  const auth = getAuth(); // Firebase authentication instance
  const Navigate = useNavigate(); // Navigation function from react-router-dom

  // Effect to check authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // If user is authenticated, set the user state
      } else {
        setUser(null); // If user is not authenticated, set the user state to null
        Navigate("/Login"); // Redirect to login page if not authenticated
      }
    });
  }, [auth, Navigate]);

  // Effect to fetch product data when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8000/addproduct`) // Fetch products from API
      .then((response) => {
        setData(response.data); // Set product data in state
      })
      .catch((error) => {
        console.error("Error fetching products:", error); // Log error if data fetching fails
      });

    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  // Function to calculate the discount percentage
  const calculateDiscount = (oldPrice, newPrice) => {
    return Math.floor(((oldPrice - newPrice) / oldPrice) * 100); // Calculate discount percentage
  };

  // JSX rendering
  return (
    <>
      <section>
        {user ? (
          <>
            <div className="max-w-[1240px] mx-auto">
              <div className="grid sm:grid-cols-4 grid-cols-1 gap-x-3 gap-y-6">
                {data &&
                  data.map((item) => (
                    <div key={item.id} className="card p-2 border sm:mx-0 mx-2">
                      <div className="h-[350px]">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="font-bold lg:text-2xl text-sm text-center">
                        {item.name}
                      </div>
                      <div
                        className="text-center"
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {item.title}
                      </div>
                      <div className="text-center text-green- font-semibold">
                        Discount:{" "}
                        {String(
                          calculateDiscount(item.oldprice, item.price)
                        ).padStart(2, "0")}
                        % off
                      </div>
                      <div className="font-semibold text-xl text-center">
                        <del>{item.oldprice} Rs.</del> {""} {item.price} Rs.
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => {
                            navigate(`/details/${item.id}`);
                          }}
                          className="bg-black text-white text-xl p-2 mt-2"
                        >
                          Show More
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="text-center">Login To View</p>
          </div>
        )}
      </section>
    </>
  );
}

export default ProductShop;
  