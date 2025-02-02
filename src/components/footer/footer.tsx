import NewsletterForm from "./newsletter-form";
import Links from "./links";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto bg-main px-cont-sm py-10 text-background md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="mx-auto w-fit 2md:mx-0 2md:w-full">
        <Link href="/" className="mb-4 block">
          <Image
            src="/footer-logo.svg"
            alt="GreenHaven Market Logo"
            width="180"
            height="25"
          />
        </Link>
        <div className="flex flex-col gap-4 2md:flex-row 2md:justify-between [&_a]:font-light [&_h6]:text-lg [&_h6]:font-semibold">
          <NewsletterForm />

          <Links />
        </div>
        <hr className="border-t-1 my-4 border-background" />
        {/*Last part*/}
        <div className="flex flex-col gap-1 text-sm font-light 2md:flex-row-reverse 2md:justify-between [&_a]:underline">
          <div className="flex flex-col gap-2 2md:flex-row">
            <Link href="/policies/privacy-policy">Privacy Policy</Link>
            <Link href="/policies/terms-of-service">Terms of Service</Link>
            <Link href="/policies/cookies-settings">Cookies Settings</Link>
          </div>
          <small className="">
            © 2024 GreenHaven Market. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
