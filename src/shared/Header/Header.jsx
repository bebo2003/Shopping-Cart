import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/images/logo.jpg";

export default function Header() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") setIsAuth(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCartItems(JSON.parse(storedCart));

    // 👇 تحديث cart لما يضاف منتج
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem("cart");
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart));
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("auth", "false");
    setIsAuth(false);
    navigate("/login");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const updateQuantity = (id, change) => {
    let updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) return null; // لو الكمية = صفر يتشال
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ حساب السعر صح
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.newPrice) || Number(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="relative">
      <header className="bg-blue-600 h-[70px] shadow relative z-20">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="w-[100px] h-[70px] object-cover"
            />
          </Link>

          {/* Center Username */}
          {isAuth && user && (
            <div className="flex-1 text-center text-yellow-300 font-semibold">
              Hi, {user.userName}
            </div>
          )}

          {/* Nav */}
          <nav>
            <ul className="flex space-x-6 text-white font-medium items-center">
              {isAuth ? (
                <>
                  {/* Cart Button */}
                  <li className="relative">
                    <button
                      onClick={toggleCart}
                      className="flex items-center focus:outline-none"
                    >
                      <FaShoppingCart size={22} />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {cartItems.length}
                        </span>
                      )}
                    </button>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:underline">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:underline">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="absolute right-4 top-[70px] w-80 bg-blue-500 text-white rounded-xl shadow-lg p-4 z-10 animate-slideDown">
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => {
                const price = Number(item.newPrice) || Number(item.price) || 0;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white text-gray-800 p-2 rounded-lg mb-2"
                  >
                    <span className="font-semibold">{item.name}</span>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-green-500 text-white w-6 h-6 rounded flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm">
                      {(price * item.quantity).toFixed(2)} EGP
                    </span>
                  </div>
                );
              })}

              <hr className="my-2 border-blue-300" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} EGP</span>
              </div>

              <button className="w-full bg-white text-blue-600 mt-3 py-2 rounded-lg font-semibold hover:bg-gray-100">
                View all Products
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
