import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTemples } from "../redux/slices/templeSlice";

const Architecture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { temples, loading, error, totalPages } = useSelector(
    (state) => state.temple,
  );

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(
      fetchTemples({
        page,
        category: "architecture"
      }),
    );
  }, [dispatch, page]);

  useEffect(() => {
    const handleScroll = () => {
      const main = document.getElementById("main-content");

      if (!main) return;

      const mainBottom = main.offsetTop + main.offsetHeight;

      const scrollPosition = window.innerHeight + window.scrollY;

      if (scrollPosition >= mainBottom - 700 && !loading && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages]);

  // const filterArchitecture = temples?.filter((temple) =>
  //   temple.categories?.includes("architecture"),
  // );
  return (
    <div className="p-5">
      {loading && (
        <div className="text-center text-lg font-semibold text-orange-500">
          Loading temples...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-medium">{error}</div>
      )}

      {!loading && temples?.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No architecture temples found.
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {temples.map((temple, index) => (
          <div
            key={temple._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={temple.images?.[0]}
                alt={temple.templeName}
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {temple.templeName}
              </h2>

              <p className="text-gray-500 mb-3">📍 {temple.city}</p>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {temple.categories?.map((cat, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={() => navigate(`/templeDetails/${temple._id}`)}
                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Architecture;