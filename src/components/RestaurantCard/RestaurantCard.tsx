import { useEffect, useState } from "react";

interface Restaurant {
  restaurantID: number;
  restaurantName: string;
  address: string;
  type: string;
  parkingLot: boolean;
}

interface MenuItem {
  imageUrl: string;
}

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/${restaurant.restaurantID}/menu`
        );
        const data: MenuItem[] = await res.json();
        if (data.length > 0 && data[0].imageUrl) {
          setImageUrl(data[0].imageUrl);
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    fetchMenu();
  }, [restaurant.restaurantID]);

  return (
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white flex flex-col">
      {/* Image or placeholder */}
      <div
        className={`h-40 bg-gray-200 bg-center bg-cover transition-opacity duration-500 ${
          imageUrl ? "opacity-100" : "opacity-50"
        }`}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        }}
      />

      {/* Content */}
      <div className="p-4 flex flex-col justify-between bg-black text-white flex-1">
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">
              {restaurant.restaurantName}
            </h3>
            {restaurant.type && (
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                {restaurant.type}
              </span>
            )}
          </div>
          <p className="text-sm mt-1">{restaurant.address}</p>
        </div>
        <div className="text-sm mt-auto">
          {restaurant.parkingLot ? (
            <span className="text-green-400">Parking available</span>
          ) : (
            <span className="text-red-400">No parking</span>
          )}
        </div>
      </div>
    </div>
  );
}
