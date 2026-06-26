import { FaHeart, FaEdit } from "react-icons/fa";

export default function ProductCard({
  product,
  onLike,
  onEdit,
}) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-img"
      />

      <h2>{product.name}</h2>

      <h3>₹ {product.price}</h3>

      <p>{product.description}</p>

      <div className="actions">
        <button
          className={product.liked ? "liked-btn" : "like-btn"}
          onClick={() => onLike(product._id)}
        >
          <FaHeart
            style={{
              marginRight: "6px",
            }}
          />
          {product.liked ? "Liked" : "Like"}
        </button>

        <button
          className="edit-btn"
          onClick={() => onEdit(product)}
        >
          <FaEdit
            style={{
              marginRight: "6px",
            }}
          />
          Edit
        </button>
      </div>
    </div>
  );
}