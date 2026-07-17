import { Mail, MapPin, Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-[#CC0000]" />
            <div>
              <h3 className="mb-1 font-semibold text-gray-900">Address</h3>
              <p className="text-sm text-gray-600">
                218 Central Ave
                <br />
                Newark, NJ, USA - 07102
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-[#CC0000]" />
            <div>
              <h3 className="mb-1 font-semibold text-gray-900">Contact</h3>
              <a
                href="mailto:aritra.dasgupta@njit.edu"
                className="text-sm text-[#CC0000] hover:underline"
              >
                aritra.dasgupta@njit.edu
              </a>
            </div>
          </div>

          {/* Open Positions */}
          <div className="flex items-start space-x-3">
            <Briefcase className="h-5 w-5 text-[#CC0000]" />
            <div>
              <h3 className="mb-1 font-semibold text-gray-900">Opportunities</h3>
              <a href="#" className="text-sm text-[#CC0000] hover:underline">
                Open Positions
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          © 2025 NIIV Lab. NJIT's Intelligible Information Visualization Lab.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
