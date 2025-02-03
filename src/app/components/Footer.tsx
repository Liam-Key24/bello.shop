export function Footer() {
  return (
    <footer className="bg-primary-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-green-100 rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium mb-4 text-green-300">Quick Links</h3>
            <ul className="space-y-2">
              {['Shop', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-green-300 hover:text-green-200 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium mb-4 text-green-300">Company</h3>
            <ul className="space-y-2">
              {['Careers', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-green-300 hover:text-green-200 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col py-5 text-center gap-4 text-green-300">
            <div className="md:flex-1 lg:w-full">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold p-5">Stay Updated</h3>
              <p className="text-xs md:text-sm lg:text-base px-5 text-primary-200">
                Subscribe to our newsletter for exclusive offers and updates
              </p>
            </div>
            <form className="flex flex-col lg:flex-col md:items-center lg:items-stretch gap-2 px-5">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="text-xs md:text-sm lg:text-base border border-1 rounded-md p-2 md:flex-1 lg:w-full bg-primary-700 placeholder-primary-300"
              />
              <button 
                type="submit"
                className="text-xs md:text-sm lg:text-base bg-green-300 text-white rounded-md p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:origin-bottom-left"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs md:text-sm lg:text-base">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
