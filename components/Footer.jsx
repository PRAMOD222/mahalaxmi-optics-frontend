import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';


export default function Footer() {
  return (
    <footer className="text-gray-600 ">
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-32 ">
        <Link href="/" className=" text-gray-900 flex items-center">
          <Image width={200} height={200} src="/logo.png" className='w-24 py-2' alt="logo" />
        </Link>

        <div className='my-10'>
          <h2 className='font-semibold text-gray-700'>Quick Links</h2>
          <ul>
            <li><Link href="/refund-policy" className="text-gray-500 hover:text-[#763F98]">Refund & Return Policy</Link></li>
            <li><Link href="/privacy-policy" className="text-gray-500 hover:text-[#763F98]">Privacy Policy</Link></li>
            {/* <li><Link href="/return-policy" className="text-gray-500 hover:text-[#763F98]">Return Policy</Link></li> */}
            <li><Link href="/terms" className="text-gray-500 hover:text-[#763F98]">Terms and Conditions</Link></li>
            <li><Link href="/shipping-policy" className="text-gray-500 hover:text-[#763F98]">Shipping Policy</Link></li>
          </ul>
        </div>
        <div className='my-10'>
          <h2 className='font-semibold text-gray-700'>Quick Links</h2>
          <ul>
            <li><Link href="/about" className="text-gray-500 hover:text-[#763F98]">About Us</Link></li>
            <li><Link href="/contact" className="text-gray-500 hover:text-[#763F98]">Contact Us</Link></li>
            {/* <li><Link href="/" className="text-gray-500 hover:text-[#763F98]">FAQs</Link></li> */}
          </ul>
        </div>

        <span className="flex items-center">
          <a className="text-gray-500 hover:text-[#763F98]" href="#" aria-label="Facebook">
            <FaFacebook className="w-5 h-5" />
          </a>
          <a className="ml-3 text-gray-500 hover:text-[#763F98]" href="#" aria-label="Twitter">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a className="ml-3 text-gray-500 hover:text-[#763F98]" href="#" aria-label="Instagram">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a className="ml-3 text-gray-500 hover:text-[#763F98]" href="#" aria-label="LinkedIn">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </span>
      </div>
      <div className="bg-gray-100 px-6 md:px-32 mt-5">
        <p className="text-sm text-gray-500 py-2">
          © 2025 Mahalaxmi Optical Traders —{' '}
          <a
            href="https://pramodkesarkar.tech"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            TF Strategirs private limited
          </a>
        </p>
      </div>
    </footer>
  );
}
