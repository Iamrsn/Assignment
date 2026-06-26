import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const likeProduct = async (id) => {
  try {
    await API.post(`/products/like/${id}`);

    setProducts((prev) =>
      prev.map((product) =>
        product._id === id
          ? { ...product, liked: !product.liked }
          : product
      )
    );

    toast.success("Updated");
  } catch (err) {
    toast.error("Unable to update");
  }
};

  const editProduct = (product) => {
    localStorage.setItem(
      "editProduct",
      JSON.stringify(product)
    );

    navigate("/add-product");
  };

  return (
    <>
      <Navbar />

      <div className="grid">
        {products.length > 0 ? (
          products.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              onLike={likeProduct}
              onEdit={editProduct}
            />
          ))
        ) : (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            No Products Found
          </h2>
        )}
      </div>
    </>
  );
}