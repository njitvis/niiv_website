import { Briefcase, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-gray-200 bg-gray-50">
      <div className="site-shell py-10">
        <div className="compact-cards-grid gap-8">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#CC0000]" />
            <div>
              <h3 className="mb-1 font-sans font-medium text-gray-900">Address</h3>
              <p className="text-sm leading-6 text-gray-700">
                New Jersey Institute of Technology
                <br />
                Guttenberg Information Technologies Center (GITC)
                <br />
                Suite 5500, University Heights
                <br />
                Newark, New Jersey 07102
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#CC0000]" />
            <div>
              <h3 className="mb-1 font-sans font-medium text-gray-900">Contact</h3>
              <a
                href="mailto:aritra.dasgupta@njit.edu"
                className="text-sm text-[#CC0000] hover:underline"
              >
                aritra.dasgupta@njit.edu
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-[#CC0000]" />
            <div>
              <h3 className="mb-1 font-sans font-medium text-gray-900">
                Opportunities
              </h3>
              <a
                href="/contact"
                className="text-sm text-[#CC0000] hover:underline"
              >
                Open Positions
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} NIIV Lab. NJIT&apos;s Intelligible
          Information Visualization Lab.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
