import ProductCard from "../cartProudcts/CartProudcts";
import Header from "../../shared/Header/Header.jsx";
import sony from "../../assets/images/sony.webp";
import saaam from "../../assets/images/Samsung-Galaxy-S23-5G.jpg";
import iphone from "../../assets/images/Apple-iPhone-14-Pro.jpg";
export default function Home() {
  const products = [
    
     { id: 1, name: "iPhone 14 Pro", oldPrice: 45000 , newPrice: 40000, image: iphone, category: "Electronics", color: "Purple" },
    { id: 2, name: "Samsung Galaxy S23", oldPrice: 38000 , newPrice: 35000, image: saaam, category: "Electronics", color: "Black" },
    { id: 3, name: "Sony Headphones", oldPrice: 5500, newPrice: 4500, image:sony, category: "Accessories", color: "White" },
    { id: 4, name: "MacBook Air M2", oldPrice: 62000 , newPrice: 60000, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-spacegray-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1653493200207", category: "Computers", color: "Gray" },
  ];

  return (
<>
<Header />
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
    </>
  );
}
