import { useEffect, useState } from "react";

interface Shops {
  restaurantID: number;
  restaurantName: string;
  address: string;
  type: string;
  parkingLot: boolean;
}

interface Item {
  itemID: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  restaurantName: string;
  restaurantID: number;
  imageUrl: string;
}

export default function Home() {
  const [shops, setShops] = useState<Shops[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const shopRes = await fetch(
          "https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant"
        );
        const shopsData = await shopRes.json();

        // Загрузка товаров
        const itemsRes = await fetch(
          "https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/items"
        );
        const itemsData = await itemsRes.json();

        // Выбираем случайные 3 элемента из каждого массива
        setShops(getRandomItems(shopsData, 3));
        setItems(getRandomItems(itemsData, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Функция для выбора случайных элементов
  function getRandomItems(array: any[], count: number) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Featured Stores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shops.map((s) => (
            <div
              key={s.restaurantID}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {s.restaurantName}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Address:</span> {s.address}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Cuisine:</span> {s.type}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Parking:</span>
                  <span
                    className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      s.parkingLot
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {s.parkingLot ? "Available" : "Not available"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  €{item.itemPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
