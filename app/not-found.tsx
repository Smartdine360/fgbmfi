import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-navy-950 px-5 pb-20 pt-40 text-center text-white">
      <div>
        <p className="eyebrow text-flame-300">Page not found</p>
        <h1 className="mt-5 text-5xl sm:text-7xl">This page has moved on.</h1>
        <p className="mx-auto mt-6 max-w-md text-white/70">The page you are looking for is no longer here, or the address was mistyped.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" fullOnMobile>
            Return Home
          </Button>
          <Button href="/contact" variant="outline-light" fullOnMobile>
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
