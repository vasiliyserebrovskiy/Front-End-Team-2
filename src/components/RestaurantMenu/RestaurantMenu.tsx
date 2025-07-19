import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { MenuItem } from ".";

export default function RestaurantMenu() {
  const { restaurantId } = useParams();
  const [items, setItems] = useState<MenuItem[]>([]);
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
    <section>
      <div>
        <Link to="/about">Back to Restaurants</Link>
      </div>

      <h2>Restaurant Menu</h2>

      <div>
        {items.map((item) => (
          <div key={item.itemID}>
            <div>
              <img src={item.imageUrl} alt={item.itemName} />
            </div>
            <div>
              <h3>{item.itemName}</h3>
              <p>{item.itemDescription}</p>
              <p>${item.itemPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
