export default function Footer() {
  return (
    <footer className="neumorphism-bg w-full p-5 flex flex-col items-center justify-evenly mb-3">
      <h2 className="text-7xl text-center mb-10">Bello.today</h2>

      <div className="w-auto h-auto">
        <div className="w-full h-auto inline-flex items-baseline space-x-5">
          <div className="w-auto h-auto flex flex-col items-center justify-center">
            <h4 className="text-xl">Nav</h4>
            <ul className="text-sm text-center">
              <li>Home</li>
              <li>Shop</li>
              <li>Categories</li>
              <li>Discover</li>
            </ul>
          </div>
          <div className="w-auto h-auto flex flex-col items-center justify-center">
            <h4 className="text-xl">About Us</h4>
            <ul className="text-sm text-center">
              <li>Team</li>
              <li>Mission</li>
            </ul>
          </div>
          <div className="w-auto h-auto flex flex-col items-center justify-center">
            <h4 className="text-xl">Support</h4>
            <ul className="text-sm text-center">
              <li>Contact</li>
              <li>Refund Policy</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
