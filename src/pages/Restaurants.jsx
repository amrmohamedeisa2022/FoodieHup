import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRestaurants } from "../state/restaurant/restaurant.action";
import Navbar from "../components/Navbar";
import { FiClock, FiMapPin, FiStar, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Restaurants() {
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (store) => store.restaurant.allRestaurants
  );

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <div
                key={r.id}
                className="bg-dark-elev rounded-2xl overflow-hidden border border-beige/10"
              >
                <img
                  src={r.images?.[0]}
                  alt={r.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-beige">{r.name}</h3>
                  <p className="text-beige/60">{r.cuisineType}</p>

                  <Link
                    to={`/restaurant/${r.id}`}
                    className="mt-4 block text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-xl"
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
