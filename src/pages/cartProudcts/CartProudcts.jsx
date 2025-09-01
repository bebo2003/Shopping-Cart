import { v4 as uuidv4 } from "uuid"; // 👈 لازم تنزّلها: npm install uuid

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // لو المنتج مفيهوش id نولّد له واحد
    const productId = product.id || uuidv4();

    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        id: productId, // 👈 id ثابت للمنتج
        price: parseFloat(product.newPrice) || 0, // 👈 نخزن السعر كـ price
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // إشعار للـ Header
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />

      <p className="font-bold">
        Product: <span className="font-normal">{product.name}</span>
      </p>
      <p className="font-bold">
        Category: <span className="font-normal">{product.category}</span>
      </p>
      <p className="font-bold">
        Color: <span className="font-normal">{product.color}</span>
      </p>
      <p className="font-bold">
        Price:{" "}
        <span className="line-through text-gray-500 mr-2">
          {product.oldPrice} EGP
        </span>
        <span>{product.newPrice} EGP</span>
      </p>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add To Cart
        </button>
        <button className="text-blue-600 hover:text-blue-800 text-2xl">♡</button>
      </div>
    </div>
  );
}
