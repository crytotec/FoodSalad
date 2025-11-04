import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-4">FoodieZone</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Bringing families together with freshly prepared meals and unforgettable flavors. 
            Your satisfaction is our main ingredient!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-yellow-400">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <Link to='/'>
            <li className="hover:text-red-500 transition">Home</li>
            </Link>
            <Link to='/about'>
            <li  className="hover:text-red-500 transition">About Us</li>
            </Link>
            <Link to='/contact'>
            <li className="hover:text-red-500 transition">Contact</li>
            </Link>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-yellow-400">Contact Us</h3>
          <p className="text-gray-300 text-sm flex items-center gap-2">
            <FaPhoneAlt /> +234 810 123 4567
          </p>
          <p className="text-gray-300 text-sm flex items-center gap-2">
            <FaEnvelope /> support@foodiezone.com
          </p>
          <p className="text-gray-300 text-sm mt-2">
            23, Flavor Street, Lagos, Nigeria.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-yellow-400">Follow Us</h3>
          <div className="flex items-center gap-4 text-2xl">
            <a href="#" className="hover:text-red-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-red-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-red-500 transition"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} FoodieZone. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
