import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categoryDescriptions: Record<string, string> = {
  "Biryani": "Spicy rice-based Indian dish.",
  "Parsi Cuisine": "Traditional dishes from the Parsi culture.",
  default: "Explore delicious meals in this category.",
};

const categoryImages: Record<string, string> = {
  "Biryani":
    "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg",
  "Parsi Cuisine": "https://images.indianexpress.com/2018/08/bhonufeat.jpg",
  "Thai": "https://piki-trip.ru/wp-content/uploads/2019/07/bannyingamex.jpg",
  "North Indian":
    "https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,q_auto,w_750/f_auto/North-Indian-food-phpUPkVj5",
  default:
    "https://deinmg.de/wp-content/uploads/2021/06/KFH-1-Restaurant-credit-mgmg-klein-4.jpg",
};

interface Restaurant {
  restaurantID: number;
  restaurantName: string;
  address: string;
  type: string;
  parkingLot: boolean;
}

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await fetch(
      "https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant"
    );
    const data: Restaurant[] = await res.json();
    const types = [...new Set(data.map((r) => r.type))];
    setCategories(types);
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((type) => {
          const image = categoryImages[type] || categoryImages.default;
          const description =
            categoryDescriptions[type] || categoryDescriptions.default;

          return (
            <Link
              to={`/categories/${encodeURIComponent(type)}`}
              key={type}
              className="group relative block h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              {/* Фон-картинка */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${image})` }}
              ></div>

              {/* Полупрозрачное затемнение */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-300"></div>

              {/* Текст поверх затемнения */}
              <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
                <h3 className="text-lg font-semibold">{type}</h3>
                <p className="text-sm">{description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
