import { useEffect } from "react";

/**
 * /admin and /admin/ open the content editor. The editor is a separate page
 * (public/admin/index.html); on Amplify a rewrite rule serves it directly, and
 * this covers the dev server and any link that reaches the app instead.
 */
const AdminRedirect = () => {
  useEffect(() => {
    window.location.replace(`/admin/index.html${window.location.hash}`);
  }, []);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-gray-600">
        Opening the editor… <a href="/admin/index.html" className="font-semibold text-[#B00000] underline">Continue</a>
      </p>
    </div>
  );
};

export default AdminRedirect;
