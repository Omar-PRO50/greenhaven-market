import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
export default function Links() {
  const iconStyles = { size: 20 };
  return (
    <>
      <div className="flex flex-col gap-1">
        <h6>Useful Links</h6>
        <Link href="/about">About Us</Link>
        <Link href="/shop">Shop All</Link>
        <Link href="/contact-us">Contact Us</Link>
      </div>
      <div className="flex flex-col gap-1">
        <h6>More Categories</h6>
        <Link href="/blog">Blog Posts</Link>
        <Link href="/faqs">FAQs</Link>
        <Link href="/return-cancellation-policies">Return Policy</Link>
      </div>
      <div className="flex items-center gap-3 2md:flex-col 2md:items-start">
        <h6>Follow Us</h6>
        <Link href="https://www.facebook.com" className="">
          <FaFacebook {...iconStyles} />
          <span>Facebook</span>
        </Link>
        <Link href="https://www.instagram.com">
          <IoLogoInstagram {...iconStyles} />
          <span>Instagram</span>
        </Link>
        <Link href="https://www.youtube.com">
          <FaYoutube {...iconStyles} />
          <span>Youtube</span>
        </Link>
        <Link href="https://www.pinterest.com">
          <FaPinterest {...iconStyles} />
          <span>Pinterest</span>
        </Link>
      </div>
    </>
  );
}
