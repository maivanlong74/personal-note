
const {VITE_PORTAL_URL: portalUrl} = import.meta.env;

export const HeaderSection = () => {

  return (
    <nav className="w-full bg-main lg:border-b -mt-2 z-20">
      <div className="px-4 py-3 sm:px-6 lg:px-8 ">
        <span className="text-white">Đây là header</span>
      </div>
    </nav>
  );
}
