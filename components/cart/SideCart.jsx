import { CrossIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

export default function SideCart({ isOpen, setIsOpen }) {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "Short description of product 1",
      quantity: 1,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Short description of product 2",
      quantity: 1,
    },
  ]);

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg"
      >
        Open Cart
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-84 bg-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col overflow-hidden`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto overflow-x-hidden">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex relative flex-row justify-between items-center border-b pb-2"
              >
                <div>
                  <Image src={item?.thumbnail} height={48} width={48} className="h-12 w-fit"/>
                </div>
                <div className="flex flex-col">
                  <div className="w-40">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 absolute top-0 right-0"
                  >
                    <ImCancelCircle />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t mt-auto">
            <button className="w-full bg-blue-600 text-white py-2 rounded-md">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
