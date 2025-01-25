import NewsletterForm from "./newsletter-form";
import Links from "./links";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-main px-cont-sm py-10 text-background md:px-cont-md lg:px-cont-lg xl:px-cont-xl">
      <div className="2md:mx-0 2md:w-full mx-auto w-fit">
        <div className="2md:flex-row 2md:justify-between flex flex-col gap-4 [&_a]:font-light [&_h6]:text-lg [&_h6]:font-semibold">
          <NewsletterForm />

          <Links />
        </div>
        <hr className="border-t-1 my-4 border-background" />
        {/*Last part*/}
        <div className="2md:flex-row-reverse 2md:justify-between flex flex-col gap-1 text-sm font-light [&_a]:underline">
          <div className="2md:flex-row flex flex-col gap-2">
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
