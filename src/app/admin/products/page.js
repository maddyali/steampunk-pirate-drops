"use client";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const fetchProducts = async () => {
    const url = "http://localhost:3000/api/products";

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          createdBy: "6838932bc84dc1f6567a0567", // hardcoded for now
        }),
      });

      const result = await res.json();

      if (result.success) {
        setProducts([result.data, ...products]);
        setFormData({ name: "", description: "", price: "", image: "" });
        setShowForm((prevState) => !prevState);
        alert("Product created successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>No products found</div>;

  return (
    <div>
      <button
        onClick={() => {
          setShowForm((prevState) => !prevState);
        }}
      >
        {showForm ? "Cancel" : "Add New Product"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Product</button>
        </form>
      )}
      <ul>
        {products.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
