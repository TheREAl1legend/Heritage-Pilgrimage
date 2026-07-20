import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";

import {
  MapPin,
  Star,
  Clock,
  Landmark,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Camera,
  Mountain,
  Calendar,
  Map,
  ArrowLeft,
} from "lucide-react";

import { fetchTempleById } from "../redux/slices/templeSlice";

import NearbyMap from "../components/NearbyMap";

const TempleDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { temple, loading, error } = useSelector((state) => state.temple);

  useEffect(() => {
    dispatch(fetchTempleById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <h1 className="text-3xl font-black text-orange-500 animate-pulse">
          Loading Temple...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <>
      {temple && (
        <div className="bg-[#fffaf5] min-h-screen">
          {/* ================= HERO ================= */}

          <div className="relative h-[85vh] overflow-hidden">
            <img
              src={
                temple.images?.[0]?.url ||
                temple.images?.[0] ||
                "https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
              }
              alt={temple.templeName}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

            {/* BACK BUTTON */}

            <button
              onClick={() => navigate(-1)}
              className="absolute top-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-white/20 transition"
            >
              <ArrowLeft size={20} />
              Back
            </button>

            {/* HERO CONTENT */}

            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
              <span className="bg-orange-500 text-white px-6 py-3 rounded-full text-sm md:text-base font-bold shadow-2xl mb-6">
                🛕 Sacred Spiritual Destination
              </span>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight max-w-6xl mb-6">
                {temple.templeName}
              </h1>

              <p className="text-lg md:text-2xl text-orange-100 flex items-center gap-3 mb-10">
                <MapPin size={24} />
                {temple.city}, {temple.state}
              </p>

              <div className="flex flex-wrap justify-center gap-5">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-2xl text-white flex items-center gap-3">
                  <Star className="text-yellow-400" size={20} />
                  <span className="font-semibold">
                    {temple.rating || 4.5} Rating
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-2xl text-white flex items-center gap-3">
                  <Clock size={20} />
                  <span className="font-semibold">
                    {temple.darshanTimings || "Timing Not Available"}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-2xl text-white flex items-center gap-3">
                  <Landmark size={20} />
                  <span className="font-semibold">
                    {temple.architectureStyle || "Ancient Architecture"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= MAIN ================= */}

          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* ================= LEFT ================= */}

              <div className="lg:col-span-2 space-y-10">
                {/* ABOUT */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <ScrollText className="text-orange-500" size={32} />

                    <h2 className="text-3xl font-black text-gray-900">
                      Temple History
                    </h2>
                  </div>

                  <p className="text-gray-700 leading-9 text-lg">
                    {temple.history || "No history available."}
                  </p>
                </div>

                {/* TEMPLE INFO */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-8">
                    Temple Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-orange-50 p-6 rounded-3xl">
                      <p className="text-gray-500 mb-2">Main Deity</p>

                      <h3 className="text-2xl font-bold text-gray-900">
                        {temple.deity || "N/A"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-3xl">
                      <p className="text-gray-500 mb-2">
                        Architecture Style
                      </p>

                      <h3 className="text-xl font-bold text-gray-900">
                        {temple.architectureStyle || "N/A"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-3xl">
                      <p className="text-gray-500 mb-2">Dynasty</p>

                      <h3 className="text-xl font-bold text-gray-900">
                        {temple.dynasty || "N/A"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-3xl">
                      <p className="text-gray-500 mb-2">Built Year</p>

                      <h3 className="text-xl font-bold text-gray-900">
                        {temple.builtYear || "Unknown"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-3xl">
                      <p className="text-gray-500 mb-2">Dress Code</p>

                      <h3 className="text-lg font-semibold text-gray-900">
                        {temple.dressCode || "No Dress Code"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-3xl">
                      <p className="text-gray-500 mb-2">Darshan Timing</p>

                      <h3 className="text-lg font-semibold text-gray-900">
                        {temple.darshanTimings || "N/A"}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* ADDRESS */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-orange-500" size={30} />

                    <h2 className="text-3xl font-black text-gray-900">
                      Temple Address
                    </h2>
                  </div>

                  <div className="bg-orange-50 rounded-3xl p-6">
                    <p className="text-gray-700 text-lg leading-8">
                      {temple.address || "Address not available"}
                    </p>
                  </div>
                </div>

                {/* VISITOR GUIDELINES */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck
                      className="text-green-500"
                      size={30}
                    />

                    <h2 className="text-3xl font-black text-gray-900">
                      Visitor Guidelines
                    </h2>
                  </div>

                  <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
                    <p className="text-gray-700 text-lg leading-8">
                      {temple.visitorGuidelines ||
                        "No visitor guidelines available."}
                    </p>
                  </div>
                </div>

                {/* CATEGORIES */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Mountain className="text-orange-500" size={30} />

                    <h2 className="text-3xl font-black text-gray-900">
                      Categories
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {temple.categories?.length > 0 ? (
                      temple.categories.map((cat, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-600 px-5 py-3 rounded-full font-bold capitalize"
                        >
                          {cat}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No categories available
                      </p>
                    )}
                  </div>
                </div>

                {/* PILGRIMAGE CIRCUITS */}

                {temple.pilgrimageCircuits?.length > 0 && (
                  <div className="bg-white rounded-[35px] shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Map className="text-blue-500" size={30} />

                      <h2 className="text-3xl font-black text-gray-900">
                        Pilgrimage Circuits
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {temple.pilgrimageCircuits.map(
                        (circuit, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full font-bold"
                          >
                            🛕 {circuit}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* FESTIVALS */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="text-yellow-500" size={30} />

                    <h2 className="text-3xl font-black text-gray-900">
                      Major Festivals
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {temple.festivals?.length > 0 ? (
                      temple.festivals.map((festival, index) => (
                        <span
                          key={index}
                          className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-full font-bold"
                        >
                          🎉 {festival}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No festivals available
                      </p>
                    )}
                  </div>
                </div>

                {/* RITUALS */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Calendar className="text-purple-500" size={30} />

                    <h2 className="text-3xl font-black text-gray-900">
                      Rituals & Puja
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {temple.rituals?.length > 0 ? (
                      temple.rituals.map((ritual, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-700 px-5 py-3 rounded-full font-bold"
                        >
                          🪔 {ritual}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No rituals available
                      </p>
                    )}
                  </div>
                </div>

                {/* GALLERY */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Camera className="text-orange-500" size={30} />

                    <h2 className="text-3xl font-black text-gray-900">
                      Temple Gallery
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {temple.images?.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-3xl overflow-hidden group shadow-lg"
                      >
                        <img
                          src={img?.url || img}
                          alt={`temple-${index}`}
                          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ================= RIGHT ================= */}

              <div className="space-y-8">
                {/* STATUS */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <h2 className="text-2xl font-black text-gray-900 mb-6">
                    Temple Status
                  </h2>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">
                      Featured Temple
                    </span>

                    <span
                      className={`px-5 py-2 rounded-full text-white font-bold ${
                        temple.featured
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {temple.featured ? "Featured" : "Normal"}
                    </span>
                  </div>
                </div>

                {/* QUICK INFO */}

                <div className="bg-white rounded-[35px] shadow-xl p-8">
                  <h2 className="text-2xl font-black text-gray-900 mb-8">
                    Quick Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-500 mb-1">Temple Name</p>

                      <h3 className="font-bold text-lg">
                        {temple.templeName}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 mb-1">Location</p>

                      <h3 className="font-bold text-lg">
                        {temple.city}, {temple.state}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 mb-1">Main Deity</p>

                      <h3 className="font-bold text-lg">
                        {temple.deity}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500 mb-1">Coordinates</p>

                      <h3 className="font-bold text-lg break-words">
                        {temple.location?.latitude || "N/A"},{" "}
                        {temple.location?.longitude || "N/A"}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* MAP */}

                <div className="bg-white rounded-[35px] shadow-xl overflow-hidden">
                  <NearbyMap temple={temple} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TempleDetail;