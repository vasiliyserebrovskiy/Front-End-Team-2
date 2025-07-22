import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the product structure
type Product = {
  itemName: string;
  imageUrl: string;
};

export default function NotFound() {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  // const [dishName, setDishName] = useState<string>("");
  const fallbackUrl = "https://fakerestaurantapi.runasp.net/Images/haleem.jpg";

  // Fetch a random product image on mount
  useEffect(() => {
    fetch(
      "https://corsproxy.io/?https://fakerestaurantapi.runasp.net/api/Restaurant/items"
    )
      .then((res) => res.json())
      .then((data: Product[]) => {
        const valid = data.filter(
          (p) =>
            p.imageUrl &&
            typeof p.imageUrl === "string" &&
            p.imageUrl.startsWith("https://") &&
            !p.imageUrl.endsWith("/")
        );

        if (valid.length > 0) {
          const random = valid[Math.floor(Math.random() * valid.length)];
          testImage(random.imageUrl, (success) => {
            setBackgroundUrl(success ? random.imageUrl : fallbackUrl);
            // setDishName(random.itemName);
          });
        } else {
          setBackgroundUrl(fallbackUrl);
          // setDishName("Haleem");
        }
      })
      .catch(() => {
        setBackgroundUrl(fallbackUrl);
        // setDishName("Haleem");
      });
  }, []);

  // Check if image URL actually works
  function testImage(url: string, callback: (success: boolean) => void) {
    // console.log(dishName);
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
  }

  return (
    // Fullscreen container with background image
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center text-white text-center px-6"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        fontFamily: "sans-serif",
      }}
    >
      {/* Centered error message */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-pink-400 mb-4">404 😕</h1>
        <p
          style={{
            backgroundColor: "rgba(201, 174, 190, 0.6)",
            padding: "2rem",
            borderRadius: "1rem",
            textAlign: "center",
            maxWidth: "500px",
            margin: "0 auto",
          }}
          className="text-xl mb-2"
        >
          The page you are looking for doesn't exist.
        </p>
      </div>

      {/* Go home button centered */}
      <div className="pb-10 flex justify-center">
        <Link
          to="/"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md transition duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
