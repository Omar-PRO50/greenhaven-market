import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-cont-sm text-main md:p-cont-md lg:p-cont-lg xl:p-cont-xl">
      {/* 🌱 Leaf Icon */}
      <div className="text-main-light">404 Error</div>
      <div className="flex items-center space-x-2">
        <span className="text-6xl">🌿</span>
        <h1 className="text-5xl font-bold">Oops! Page Not Found</h1>
      </div>

      <p className="mt-4 text-lg text-main">
        Looks like you&apos;ve wandered off the sustainable path. Let&apos;s get
        you back!
      </p>

      {/* 🏡 Home Button */}
      <Link
        href="/"
        className="mt-6 rounded-full border-2 border-main px-6 py-3 text-lg font-semibold text-main transition-all duration-300 hover:bg-main hover:text-white"
      >
        Go Back Home
      </Link>
    </div>
  );
}
