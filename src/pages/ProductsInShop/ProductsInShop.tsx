import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface ProductsItem {
  itemID: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  restaurantName: string;
  restaurantID: number;
  imageUrl: string;
}

export default function ProductsInShop() {
  const { restaurantId } = useParams();
  const [items, setItems] = useState<ProductsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [restaurantId]);

  async function fetchItems() {
    try {
      const res = await fetch(
        `https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/${restaurantId}/menu`
      );
      const items = await res.json();
      setItems(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link
          to="/about"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back to About
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        List of products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.itemID}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gray-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.itemName}
              </h3>
              <p className="text-gray-600 mb-3">{item.itemDescription}</p>
              <p className="text-lg font-medium text-blue-600">
                ₹{item.itemPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
