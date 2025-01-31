export function Footer() {
  return (
    <footer className="bg-primary-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">About Us</h3>
            <p className="text-primary-200">
              Dedicated to bringing you the finest natural health and wellness products.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Newsletter</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded flex-1 text-primary-800"
              />
              <button className="bg-accent hover:bg-accent-dark px-4 py-2 rounded transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
