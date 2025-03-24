"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart, removeFromCart, toggleSlider } from "@/store/cartSlice";
import { ImCancelCircle } from "react-icons/im";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

export default function SideCart() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const isSliderOpen = useSelector((state) => state.cart.isSliderOpen);

  const handleIncreaseQuantity = async (item) => {
    await dispatch(addToCart(item));
    dispatch(getCart());
  };

  const handleDecreaseQuantity = async (id) => {
    await dispatch(removeFromCart({product:id}));
    dispatch(getCart());
  };

  const removeAnItem = async (id, quantity)=>{
    await dispatch(removeFromCart({product:id,quantity}))
    dispatch(getCart())
  }

  const fetchCart = async () => {
    await dispatch(getCart());
  };

  useEffect(() => {
    fetchCart();
  }, [dispatch]);

  useEffect(()=>{
    console.log("fetched cart:", cartItems)
  }, [cartItems])

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.discounted_price || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div>
      {/* Cart Toggle Button */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        Open Cart
      </button> */}

      {/* Cart Overlay */}
      {isSliderOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform ${
          isSliderOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col z-50 overflow-hidden`}
      >
        {/* Cart Header */}
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={() => dispatch(toggleSlider(false))}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const price = item.product?.discounted_price || item.product?.price;
              const totalPrice = price * item.quantity;

              return (
                <div
                  key={item?.product?._id || `${item?.product?.name}${Date.now()}`}
                  className="flex items-center space-x-4 py-4 border-b last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={`${baseApi}${item?.product?.thumbnail}` || "/default-image.jpg"}
                      height={80}
                      width={80}
                      alt={item?.product?.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item?.product?.name}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {item?.product?.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item?.product)}
                        className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item?.product)}
                        className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Price: ₹{price?.toFixed(2)} x {item.quantity} = ₹{totalPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    onClick={() => removeAnItem(item?.product , item?.quantity)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <ImCancelCircle className="w-5 h-5" />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Checkout Section */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Total:</p>
              <p className="text-lg font-semibold">₹{calculateTotal().toFixed(2)}</p>
            </div>
            <button onClick={()=>{
              dispatch(toggleSlider(false));router.push("/checkout")}} className="w-full bg-[#763f98] text-white py-3 rounded-md hover:bg-[#985ebc] transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}