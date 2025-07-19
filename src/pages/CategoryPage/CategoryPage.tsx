import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";

interface Restaurant {
  restaurantID: number;
  restaurantName: string;
  address: string;
  type: string;
  parkingLot: boolean;
}

const CategoryPage = () => {
  const { type } = useParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurantsByType() {
      setLoading(true);
      const res = await fetch(
        "https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant"
      );
      const data: Restaurant[] = await res.json();
      const filtered = data.filter((r) => r.type === type);
      setRestaurants(filtered);
      setLoading(false);
    }
    fetchRestaurantsByType();
  }, [type]);

  return (
    <div className="px-6 py-8">
      <div className="mb-6">
        <Link
          to="/categories"
          className="text-sm text-blue-400 hover:underline"
        >
          &larr; Back to categories
        </Link>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">{type}</h2>
        <p className="text-gray-600 mt-1">Restaurants in this category</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : restaurants.length === 0 ? (
        <p className="text-red-500">No restaurants found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r.restaurantID} restaurant={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
