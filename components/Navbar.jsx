import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="text-gray-600 body-font ">
      <div className="mx-6 md:mx-32 flex justify-between items-center py-2">
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="text-orange-500 text-2xl font-bold">Logo</span>
        </Link>
        <nav className=" flex items-center justify-center">
          <Link href='/' className="p-2 m-2 text-xl hover:text-orange-500 flex items-center">Home</Link>
          <Link href='/' className="p-2 m-2 text-xl hover:text-orange-500 flex items-center">About</Link>
          <Link href='/' className="p-2 m-2 text-xl hover:text-orange-500 flex items-center">Services</Link>
          <Link href='/' className="p-2 m-2 text-xl hover:text-orange-500 flex items-center">Contact</Link>
        </nav>
        <span><Link href={'/login'}>Login</Link>/<Link href={'/signup'}>Signup</Link></span>
      </div>
    </header>
  );
}
