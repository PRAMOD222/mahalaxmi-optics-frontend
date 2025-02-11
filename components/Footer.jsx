import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="text-gray-600 ">
      <div className="mx-6 md:mx-32 px-5 py-8 flex items-center">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="text-orange-500 text-2xl font-bold">Logo</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 Logo —{' '}
          <a
            href="https://pramodkesarkar.tech"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            Pramod.Dev
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500 hover:text-orange-500" href="#" aria-label="Facebook">
            <FaFacebook className="w-5 h-5" />
          </a>
          <a className="ml-3 text-gray-500 hover:text-orange-500" href="#" aria-label="Twitter">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a className="ml-3 text-gray-500 hover:text-orange-500" href="#" aria-label="Instagram">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a className="ml-3 text-gray-500 hover:text-orange-500" href="#" aria-label="LinkedIn">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </span>
      </div>
    </footer>
  );
}
