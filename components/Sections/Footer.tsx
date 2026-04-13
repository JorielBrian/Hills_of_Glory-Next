import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const sections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Ministries", href: "/" },
        { label: "Services", href: "/" },
        { label: "About", href: "/" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/" },
        { label: "Sign In", href: "/sign-in" },
        { label: "Sign Up", href: "/sign-up" },
      ],
    },
    {
        title: "Connect",
        links: [
            { label: "Facebook", href: "https://www.facebook.com/hillsofglorymabalacat" },
            { label: "Instagram", href: "https://www.instagram.com/hillsofglorymabalacat/" },
        ]
    }
  ];

  return (
    <footer className="h-fit! border-t border-white/10 bg-[#030303]/70 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <Link href="/" className="flex items-center gap-3 text-2xl font-semibold text-[#fdc53a]">
              <Image
                src="/hog_logo.png"
                alt="Hills of Glory logo"
                width={44}
                height={44}
                className="rounded-full bg-white/5"
              />
              <span>Hills of Glory Mabalacat</span>
            </Link>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
              A community rooted in worship, service, and disciple-making. Connect, grow, and serve with us as we honor God and raise committed disciples.
            </p>
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-3 lg:w-auto">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {section.title}
                </h2>
                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-colors hover:text-[#fdc53a]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Hills of Glory Mabalacat. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="transition-colors hover:text-[#fdc53a]">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/" className="transition-colors hover:text-[#fdc53a]">
              Terms of Use
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/" className="transition-colors hover:text-[#fdc53a]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
