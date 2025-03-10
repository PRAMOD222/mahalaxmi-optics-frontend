import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F9FAFB] text-gray-800">

      <div className="container mx-auto px-8 md:px-36 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="flex flex-col space-y-6">
            <Link href="/" className="cursor-pointer">
              <Image
                width={150}
                height={150}
                src="/logo.png"
                alt="Mahalaxmi Optics Logo"
                className="w-32 h-auto hover:scale-110 transition-transform"
              />
            </Link>
            <p className="text-sm text-gray-600">
              Mahalaxmi Optics offers stylish eyewear for every need, combining comfort and clarity in every pair.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 hover:text-[#6A1B9A] transition duration-300 cursor-pointer"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-semibold text-[#4A148C]">Quick Links</h3>
            <ul className="space-y-3">
              {["Refund Policy", "Privacy Policy", "Terms & Conditions", "Shipping Policy"].map((link, index) => (
                <li key={index}>
                  <Link
                    href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm text-gray-600 hover:text-[#6A1B9A] transition duration-300 cursor-pointer"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-semibold text-[#4A148C]">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600 flex items-center hover:text-[#6A1B9A] transition duration-300 cursor-pointer">
                <FaPhone className="w-5 h-5 mr-2 text-[#6A1B9A]" /> +91 9822002973
              </li>
              <li className="text-sm text-gray-600 flex items-center hover:text-[#6A1B9A] transition duration-300 cursor-pointer">
                <FaEnvelope className="w-5 h-5 mr-2 text-[#6A1B9A]" /> info@opticalhut.in
              </li>
              <li className="text-sm text-gray-600 flex items-center hover:text-[#6A1B9A] transition duration-300 cursor-pointer">
                <FaMapMarkerAlt className="w-10 h-5 mr-2 text-[#6A1B9A]" />
                C-4, Haripriya Plaza, Main Besides Dominos Pizza, Rajaram Rd, Rajarampuri, Kolhapur, Maharashtra 416008
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-lg font-semibold text-[#4A148C]">For More Updates</h3>
            <p className="text-sm text-gray-600">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A] text-sm text-gray-800"
              />
              <button
                type="submit"
                className="w-1/2 md:w-1/2 px-6 py-2 bg-[#6A1B9A] text-white rounded-lg hover:bg-[#4A148C] transition duration-300 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      
      <div className="bg-[#E1BEE7] py-4">
        <div className="container mx-auto px-8 md:px-16 text-center">
          <p className="text-sm text-gray-700">
            © 2025 Mahalaxmi Optics. All Rights Reserved. | Designed by{" "}
            <a
              href="https://pramodkesarkar.tech"
              className="text-[#6A1B9A] hover:text-[#4A148C] transition duration-300 cursor-pointer"
            >
              TF Strategies Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}