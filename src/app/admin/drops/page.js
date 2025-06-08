"use client";
import { useState, useEffect } from "react";

export default function Drops() {
  const [drops, setDrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dropDate: "",
    endDate: "",
    products: [], // array of product IDs
    createdBy: "6838932bc84dc1f6567a0567", // hardcoded for now
  });

  const fetchDrops = async () => {
    try {
      const res = await fetch("/api/drops");
      const result = await res.json();
      setDrops(result.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDrops();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const result = await res.json();
      setAvailableProducts(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleProductChange = (e) => {
    const selectedArray = Array.from(e.currentTarget.selectedOptions);
    const selectedValues = selectedArray.map((option) => option.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      products: selectedValues,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/drops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setDrops([result.data, ...drops]);
        setFormData({
          name: "",
          description: "",
          dropDate: "",
          endDate: "",
          products: [],
          createdBy: "6838932bc84dc1f6567a0567" /* hardcoded for now */,
        });
        setShowForm((prevState) => !prevState);
        alert("Drop created successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!drops.length) return <div>No drops found. Create your first drop!</div>;

  const dropElements = drops.map((drop) => {
    return (
      <div key={drop._id} className="mt-20">
        <h3>{drop.name}</h3>
        <p>{drop.description || "Add description"}</p>
        <p>
          <strong>Status: </strong>
          {drop.status}
        </p>
        <p>
          <strong>Drop Date: </strong>
          {drop.dropDate}
        </p>
        <p>
          <strong>End Date: </strong>
          {drop.endDate}
        </p>
        <p>
          <strong>Products: </strong>
          {drop.products?.length || 0} items
        </p>
      </div>
    );
  });

  return (
    <div>
      <h1>Drop Management</h1>
      <button onClick={() => setShowForm((prevState) => !prevState)}>
        {showForm ? "Cancel" : "Create New Drop"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Drop Name:</label>
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
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="dropDate">Drop Start Date:</label>
            <input
              id="dropDate"
              type="datetime-local"
              name="dropDate"
              value={formData.dropDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="endDate">Drop End Date:</label>
            <input
              id="endDate"
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="products">Select Products:</label>

            <select
              id="products"
              name="products"
              multiple
              value={formData.products}
              onChange={handleProductChange}
              required
            >
              {availableProducts?.map((product) => {
                return (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.price}
                  </option>
                );
              })}
            </select>
            <p>
              <small>Hold Ctrl/Cmd to select multiple products.</small>
            </p>
          </div>

          <button type="submit">Create Drop</button>
        </form>
      )}

      {dropElements}
    </div>
  );
}
