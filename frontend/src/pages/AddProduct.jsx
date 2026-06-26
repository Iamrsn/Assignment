import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";
import toast from "react-hot-toast";

export default function AddProduct() {
  const navigate = useNavigate();

  const oldProduct = JSON.parse(localStorage.getItem("editProduct"));

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (oldProduct) {
      setForm({
        name: oldProduct.name || "",
        price: oldProduct.price || "",
        image: oldProduct.image || "",
        description: oldProduct.description || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) {
      return toast.error("Product name is required");
    }

    if (!form.price) {
      return toast.error("Product price is required");
    }

    if (Number(form.price) <= 0) {
      return toast.error("Price must be greater than 0");
    }

    if (!form.image.trim()) {
      return toast.error("Product image URL is required");
    }

    if (!form.description.trim()) {
      return toast.error("Product description is required");
    }

    try {
      if (oldProduct) {
        await API.put(`/products/${oldProduct._id}`, form);

        localStorage.removeItem("editProduct");

        toast.success("Product Updated");
      } else {
        await API.post("/products", form);

        toast.success("Product Added");
      }

      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <form className="card" onSubmit={submit}>
          <h2>
            {oldProduct ? "Edit Product" : "Add Product"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            type="url"
            name="image"
            placeholder="Product Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {oldProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
}