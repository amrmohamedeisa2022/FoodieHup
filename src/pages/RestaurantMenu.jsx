import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuItemsByRestaurantId } from "../state/menu/menu.action";
import { fetchAllRestaurants } from "../state/restaurant/restaurant.action";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { useCart } from "../context/CartContext";
import { FiHeart } from "react-icons/fi";
import { useFavorites } from "../context/FavoritesContext";

export default function RestaurantMenu() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const menu = useSelector((store) => store.menu.menuItems);

  const restaurants = useSelector(
    (store) => store.restaurant.allRestaurants
  );

  const currentRestaurant = restaurants.find(
    (r) => String(r.id) === String(id)
  );

  const handleAddToCart = async (item) => {
  try {
    await api.put(
      "/api/cart/add",
      {
        foodId: item.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    // ✅ مهم جدًا → أضف للـ context
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.images?.[0],
      restaurantId: Number(item.restaurant?.id || id), // 🔥 الحل هنا
      qty: 1,
    });

    navigate("/cart");

  } catch (error) {
    console.error("ADD TO CART ERROR", error.response?.data || error);
  }
};

  // ✅ GROUP BY CATEGORY
  const groupedMenu = menu.reduce((acc, item) => {
    const categoryName = item.category?.name || "Other";

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push(item);
    return acc;
  }, {});

  useEffect(() => {
    if (id) {
      dispatch(getMenuItemsByRestaurantId({ restaurantId: id }));
      dispatch(fetchAllRestaurants());
    }
  }, [dispatch, id]);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-beige mb-10">
            {currentRestaurant?.name || "Restaurant"}
            <span className="text-amber-400 ml-2">Menu</span>
          </h1>

          {menu.length === 0 ? (
            <p className="text-beige/60 text-center">
              No menu items found
            </p>
          ) : (
            <>
              {Object.keys(groupedMenu).map((category) => (
                <div key={category} className="mb-12">

                  {/* CATEGORY TITLE */}
                  <h2 className="text-2xl font-bold text-amber-400 mb-2">
                    {category}
                  </h2>

                  <div className="w-16 h-1 bg-amber-500 mb-6 rounded"></div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {groupedMenu[category].map((item) => (
                      <div
                        key={item.id}
                        className="bg-dark-elev rounded-2xl overflow-hidden border border-beige/10 hover:scale-[1.02] transition"
                      >

                        {/* IMAGE + ❤️ */}
                        <div className="relative">
                          <img
                            src={item.images?.[0]}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                          />

                          {/* ❤️ FAVORITE */}
                          <button
                            onClick={() =>
                              toggleFavorite({
                                id: item.id,
                                name: item.name,
                                image: item.images?.[0],
                                price: item.price,
                              })
                            }
                            className="absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur rounded-full flex items-center justify-center transition hover:scale-110"
                          >
                            <FiHeart
                              className={`text-lg ${
                                isFavorite(item.id)
                                  ? "text-red-500 fill-red-500"
                                  : "text-white"
                              }`}
                            />
                          </button>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6">

                          <h3 className="text-xl font-bold text-beige">
                            {item.name}
                          </h3>

                          <p className="text-beige/60 text-sm mb-3">
                            {item.description}
                          </p>

                          {/* PRICE */}
                          <span className="text-amber-400 font-bold text-lg">
                            {item.price} EGP
                          </span>

                          {/* STATUS + BUTTON */}
                          <div className="flex justify-between items-center mt-3">

                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                item.available
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {item.available
                                ? "In Stock"
                                : "Out Of Stock"}
                            </span>

                            {item.available && (
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:scale-105 transition"
                              >
                                Add to Cart
                              </button>
                            )}

                          </div>

                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}