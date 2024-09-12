import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="">
      <h1 className='text-red-900'>Đây là home page</h1>
      <div>
        <Link to="/management">Đi đến Admin</Link>
      </div>
    </div>
  );
}
