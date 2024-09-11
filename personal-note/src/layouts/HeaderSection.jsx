
const {VITE_PORTAL_URL: portalUrl} = import.meta.env;

export const HeaderSection = () => {

  return (
    <nav className="w-full bg-main  border-b-0 lg:border-b-2 fixed -mt-2 z-20">
      <div className="mx-auto px-4 py-2 sm:px-6 lg:px-8 ">
        <h1>Đây là header</h1>
      </div>
    </nav>
  );
}
