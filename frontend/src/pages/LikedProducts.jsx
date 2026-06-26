import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function LikedProducts() {
  const [products, setProducts] = useState([]);

  const fetchLiked = async () => {
    try {
      const res = await API.get("/products/liked/list");
      setProducts(res.data);
    } catch {
      toast.error("Unable to load liked products");
    }
  };

  useEffect(() => {
    fetchLiked();
  }, []);

  const unlike = async (id) => {
    try {
      await API.post(`/products/like/${id}`);

      setProducts(products.filter((p) => p._id !== id));

      toast.success("Removed from liked");
    } catch {
      toast.error("Unable to unlike product");
    }
  };

  return (
    <>
      <Navbar />

      <div className="grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onLike={unlike}
              onEdit={() => {}}
            />
          ))
        ) : (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            No liked products found
          </h2>
        )}
      </div>
    </>
  );
}