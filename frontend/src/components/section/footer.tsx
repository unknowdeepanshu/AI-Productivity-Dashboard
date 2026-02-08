export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-sm text-gray-500">
          © 2026 AI Team Dashboard. All rights reserved.
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#" className="text-gray-600 hover:text-black">
            Docs
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Integrations
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Privacy
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
