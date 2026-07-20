import React from "react";
import { Link } from "react-router-dom";
import { Landmark, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white mt-20">
      {/* ================= TOP SECTION ================= */}

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* ================= LOGO ================= */}

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 p-3 rounded-2xl">
              <Landmark size={30} />
            </div>

            <div>
              <h2 className="text-2xl font-black">India Temple</h2>
              <p className="text-orange-400 text-sm tracking-wide">
                Heritage & Pilgrimage
              </p>
            </div>
          </div>

          <p className="text-gray-400 leading-8">
            Explore India's sacred temples, pilgrimage circuits, ancient
            architecture, spiritual heritage, and divine cultural traditions.
          </p>
        </div>

        {/* ================= QUICK LINKS ================= */}

        <div>
          <h3 className="text-2xl font-bold mb-6">Quick Links</h3>

          <ul className="space-y-4 text-gray-400">
            <li>
              <Link to="/" className="hover:text-orange-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/templeList"
                className="hover:text-orange-400 transition"
              >
                Temples
              </Link>
            </li>

            <li>
              <Link
                to="/circuits"
                className="hover:text-orange-400 transition"
              >
                Pilgrimage Tours
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-orange-400 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= CATEGORIES ================= */}

        <div>
          <h3 className="text-2xl font-bold mb-6">Temple Categories</h3>

          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-orange-400 transition cursor-pointer">
              Jyotirlinga Temples
            </li>
            <li className="hover:text-orange-400 transition cursor-pointer">
              Char Dham
            </li>
            <li className="hover:text-orange-400 transition cursor-pointer">
              Shakti Peeth
            </li>
            <li className="hover:text-orange-400 transition cursor-pointer">
              South Indian Temples
            </li>
            <li className="hover:text-orange-400 transition cursor-pointer">
              UNESCO Heritage Temples
            </li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}

        <div>
          <h3 className="text-2xl font-bold mb-6">Contact</h3>

          <div className="space-y-5 text-gray-400">
            <div className="flex gap-4">
              <MapPin className="text-orange-400" size={22} />
              <p>India Temple Heritage Portal, India</p>
            </div>

            <div className="flex gap-4">
              <Mail className="text-orange-400" size={22} />
              <p>support@templeportal.com</p>
            </div>

            <div className="flex gap-4">
              <Phone className="text-orange-400" size={22} />
              <p>+91 98******23</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-center">
            © 2026 India Temple Heritage & Pilgrimage. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-gray-500">
            <Link to="/privacy" className="hover:text-orange-400 transition">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-orange-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;