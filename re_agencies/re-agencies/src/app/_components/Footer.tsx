const Footer = () => (
    <footer className="bg-green-700 text-white py-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-sm">
          <p>12, 26th Street, Ashok Nagar, Chennai - 600083</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-yellow-400">Facebook</a>
          <a href="#" className="hover:text-yellow-400">Twitter</a>
          <a href="#" className="hover:text-yellow-400">Instagram</a>
          {/* Add more social media links */}
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  