import { useEffect, useState } from "react";
import type { Shops } from ".";
import { Link } from "react-router-dom";

export default function About() {
  const [shops, setShops] = useState<Shops[]>([]);
  useEffect(() => {
    fetchShops();
  }, []);

  async function fetchShops() {
    const res = await fetch(
      "https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant"
    );
    const productsRes = await res.json();
    setShops(productsRes);
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2>About Us 🍽️ </h2>
      <p>
        We’re a team of passionate, creative developers who believe that food
        should be accessible, delicious, and uplifting—even on the busiest of
        days.
      </p>
      <p>
        ⏱️ In today’s fast-paced world, no one has time for long lines or
        uninspiring meals. That’s why we’re building an online takeaway food
        shop to help people quickly find exactly what they’re craving—dishes
        that inspire, energize, and delight.
      </p>
      <p>
        🎯 Our goal isn't just to create a store—it’s to build a platform for
        discovering high-quality, diverse food options. We strive to combine
        thoughtful technology with genuine care, bringing flavor closer to you.
      </p>
      <p>
        🥗 We believe food is more than fuel. It’s culture. It’s emotion. It’s a
        moment of rest amid the rush of the day. That’s why we pay attention to
        every detail—from the interface to the dish card.
      </p>
      <p>
        ✨ Tasty. Fast. Nearby. — more than a slogan, it’s our way of doing
        things. Join us and make lunch effortless, and dinner something truly
        special.
      </p>
      <div>
        {shops.map((s) => (
          <div
            key={s.restaurantID}            
          >
            <div>
              <h3>
                {s.restaurantName}
              </h3>
              {/* <p>ID: {s.restaurantID}</p> */}
              <p>Address: {s.address}</p>
              <p>Type: {s.type}</p>
              <p>
                {" "}
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
              <Link
                to={`/restaurants/${s.restaurantID}/menu`}
                className="inline-block px-4 py-2 bg-blue-500   text-white rounded-md hover:bg-cyan-500 transition-colors"
              >
                View Menu
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
