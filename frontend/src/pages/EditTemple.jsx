import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  updateTemple,
  fetchTempleById,
  clearTempleError,
  clearTempleSuccess,
} from "../redux/slices/templeSlice";

import { fetchCategories } from "../redux/slices/categorySlice";

import {
  Upload,
  ImagePlus,
  MapPin,
  Clock,
  ScrollText,
  Landmark,
} from "lucide-react";

import { useParams, useNavigate } from "react-router-dom";

const EditTemple = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { loading, error, success, temple } = useSelector(
    (state) => state.temple,
  );

  const { categories: categoryList } = useSelector((state) => state.category);

  /* =========================
     STATES
  ========================= */

  const [templeName, setTempleName] = useState("");

  const [slug, setSlug] = useState("");

  const [deity, setDeity] = useState("");

  const [stateName, setStateName] = useState("");

  const [city, setCity] = useState("");

  const [address, setAddress] = useState("");

  const [history, setHistory] = useState("");

  const [architectureStyle, setArchitectureStyle] = useState("");

  const [dynasty, setDynasty] = useState("");

  const [builtYear, setBuiltYear] = useState("");

  const [darshanTimings, setDarshanTimings] = useState("");

  const [visitorGuidelines, setVisitorGuidelines] = useState("");

  const [dressCode, setDressCode] = useState("");

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [festivals, setFestivals] = useState("");

  const [rituals, setRituals] = useState("");

  const [categories, setCategories] = useState([]);

  const [featured, setFeatured] = useState(false);

  const [rating, setRating] = useState(4.5);

  const [pilgrimageCircuits, setPilgrimageCircuits] = useState([]);

  /* =========================
     IMAGE STATES
  ========================= */

  const [existingImages, setExistingImages] = useState([]);

  const [newImages, setNewImages] = useState([]);

  const [newPreviewImages, setNewPreviewImages] = useState([]);

  /* =========================
     PILGRIMAGE OPTIONS
  ========================= */

  const pilgrimageOptions = [
    "Char Dham",
    "Chota Char Dham",
    "Jyotirlinga",
    "Shakti Peeth",
    "Sapta Puri",
    "Panch Kedar",
    "Pancha Bhoota Sthalams",
    "Divya Desam",
    "Ashtavinayak",
    "Kanwar Yatra",
    "Amarnath Yatra",
    "Kumbh Mela Circuit",
  ];

  /* =========================
     FETCH DATA
  ========================= */

  useEffect(() => {
    dispatch(fetchCategories());

    dispatch(fetchTempleById(id));
  }, [dispatch, id]);

  /* =========================
     SET TEMPLE DATA
  ========================= */

  useEffect(() => {
    if (temple) {
      setTempleName(temple.templeName || "");

      setSlug(temple.slug || "");

      setDeity(temple.deity || "");

      setStateName(temple.state || "");

      setCity(temple.city || "");

      setAddress(temple.address || "");

      setHistory(temple.history || "");

      setArchitectureStyle(temple.architectureStyle || "");

      setDynasty(temple.dynasty || "");

      setBuiltYear(temple.builtYear || "");

      setDarshanTimings(temple.darshanTimings || "");

      setVisitorGuidelines(temple.visitorGuidelines || "");

      setDressCode(temple.dressCode || "");

      setLatitude(temple.location?.latitude || "");

      setLongitude(temple.location?.longitude || "");

      setFestivals(temple.festivals?.join(", ") || "");

      setRituals(temple.rituals?.join(", ") || "");

      setCategories(temple.categories || []);

      setFeatured(temple.featured || false);

      setRating(temple.rating || 4.5);

      setExistingImages(temple.images || []);

      setPilgrimageCircuits(temple.pilgrimageCircuits || []);
    }
  }, [temple]);

  /* =========================
     AUTO SLUG
  ========================= */

  useEffect(() => {
    setSlug(templeName.toLowerCase().trim().replace(/\s+/g, "-"));
  }, [templeName]);

  /* =========================
     HANDLE NEW IMAGES
  ========================= */

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setNewImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setNewPreviewImages((prev) => [...prev, ...previews]);
  };

  /* =========================
     REMOVE EXISTING IMAGE
  ========================= */

  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  /* =========================
     REMOVE NEW IMAGE
  ========================= */

  const removeNewImage = (indexToRemove) => {
    setNewPreviewImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );

    setNewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  /* =========================
     HANDLE CATEGORY
  ========================= */

  const handleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((item) => item !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  /* =========================
     HANDLE PILGRIMAGE
  ========================= */

  const handlePilgrimage = (item) => {
    if (pilgrimageCircuits.includes(item)) {
      setPilgrimageCircuits(pilgrimageCircuits.filter((p) => p !== item));
    } else {
      setPilgrimageCircuits([...pilgrimageCircuits, item]);
    }
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("templeName", templeName);

    formData.append("slug", slug);

    formData.append("deity", deity);

    formData.append("state", stateName);

    formData.append("city", city);

    formData.append("address", address);

    formData.append("history", history);

    formData.append("architectureStyle", architectureStyle);

    formData.append("dynasty", dynasty);

    formData.append("builtYear", builtYear);

    formData.append("darshanTimings", darshanTimings);

    formData.append("visitorGuidelines", visitorGuidelines);

    formData.append("dressCode", dressCode);

    formData.append("featured", featured);

    formData.append("rating", rating);

    formData.append("latitude", latitude);

    formData.append("longitude", longitude);

    formData.append("existingImages", JSON.stringify(existingImages));

    festivals
      .split(",")
      .filter((item) => item.trim() !== "")
      .forEach((festival) => {
        formData.append("festivals", festival.trim());
      });

    rituals
      .split(",")
      .filter((item) => item.trim() !== "")
      .forEach((ritual) => {
        formData.append("rituals", ritual.trim());
      });

    categories.forEach((category) => {
      formData.append("categories", category);
    });

    pilgrimageCircuits.forEach((item) => {
      formData.append("pilgrimageCircuits", item);
    });

    newImages.forEach((img) => {
      formData.append("images", img);
    });

    dispatch(
      updateTemple({
        id,
        formData,
      }),
    );
  };

  /* =========================
     SUCCESS / ERROR
  ========================= */

  useEffect(() => {
    if (error) {
      alert(error);

      dispatch(clearTempleError());
    }

    if (success) {
      alert("Temple Updated Successfully");

      dispatch(clearTempleSuccess());

      navigate("/admin/upload");
    }
  }, [error, success, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-orange-50 py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-2xl p-10">
        {/* HEADER */}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Update Temple
          </h1>

          <p className="text-gray-600 text-lg">
            Edit temple information, rituals, festivals and images.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* BASIC INFO */}

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Temple Name"
              value={templeName}
              onChange={(e) => setTempleName(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Slug"
              value={slug}
              readOnly
              className="border p-4 rounded-2xl bg-gray-100"
            />

            <input
              type="text"
              placeholder="Deity"
              value={deity}
              onChange={(e) => setDeity(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="State"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Architecture Style"
              value={architectureStyle}
              onChange={(e) => setArchitectureStyle(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Dynasty"
              value={dynasty}
              onChange={(e) => setDynasty(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Built Year"
              value={builtYear}
              onChange={(e) => setBuiltYear(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Darshan Timings"
              value={darshanTimings}
              onChange={(e) => setDarshanTimings(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Dress Code"
              value={dressCode}
              onChange={(e) => setDressCode(e.target.value)}
              className="border p-4 rounded-2xl"
            />

            <input
              type="number"
              step="0.1"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-4 rounded-2xl"
            />
          </div>

          {/* HISTORY */}

          <div>
            <label className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ScrollText />
              Temple History
            </label>

            <textarea
              rows="7"
              placeholder="Temple History"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              className="w-full border p-5 rounded-2xl"
            ></textarea>
          </div>

          {/* VISITOR GUIDELINES */}

          <div>
            <label className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock />
              Visitor Guidelines
            </label>

            <textarea
              rows="5"
              placeholder="Visitor Guidelines"
              value={visitorGuidelines}
              onChange={(e) => setVisitorGuidelines(e.target.value)}
              className="w-full border p-5 rounded-2xl"
            ></textarea>
          </div>

          {/* LOCATION */}

          <div>
            <h3 className="text-2xl font-bold flex items-center gap-3 mb-6">
              <MapPin />
              Location
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="border p-4 rounded-2xl"
              />
            </div>
          </div>

          {/* FESTIVALS */}

          <input
            type="text"
            placeholder="Festivals (comma separated)"
            value={festivals}
            onChange={(e) => setFestivals(e.target.value)}
            className="w-full border p-4 rounded-2xl"
          />

          {/* RITUALS */}

          <input
            type="text"
            placeholder="Rituals (comma separated)"
            value={rituals}
            onChange={(e) => setRituals(e.target.value)}
            className="w-full border p-4 rounded-2xl"
          />

          {/* CATEGORIES */}

          <div>
            <h3 className="text-2xl font-bold mb-5">Categories</h3>

            <div className="flex flex-wrap gap-4">
              {categoryList.map((category) => (
                <button
                  type="button"
                  key={category._id}
                  onClick={() => handleCategory(category.name)}
                  className={`px-5 py-3 rounded-full border transition ${
                    categories.includes(category.name)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* PILGRIMAGE CIRCUITS */}

          <div>
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
              <Landmark />
              Pilgrimage Circuits
            </h3>

            <div className="flex flex-wrap gap-4">
              {pilgrimageOptions.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handlePilgrimage(item)}
                  className={`px-5 py-3 rounded-full border transition ${
                    pilgrimageCircuits.includes(item)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* FEATURED */}

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />

            <label className="font-semibold text-lg">Featured Temple</label>
          </div>

          {/* IMAGE */}

          <div>
            <label className="flex items-center gap-3 text-2xl font-bold mb-5">
              <ImagePlus />
              Upload Images
            </label>

            <label className="border-2 border-dashed border-orange-300 p-10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition">
              <ImagePlus size={50} className="text-orange-500 mb-4" />

              <p className="text-lg font-semibold">Click to Upload Images</p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="hidden"
              />
            </label>

            {/* EXISTING IMAGES */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
              {existingImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt=""
                    className="h-44 w-full object-cover rounded-2xl shadow-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* NEW IMAGES */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
              {newPreviewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt=""
                    className="h-44 w-full object-cover rounded-2xl shadow-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTON */}

          <button
            disabled={loading}
            className={`w-full py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            <Upload size={24} />

            {loading ? "Updating..." : "Update Temple"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTemple;
