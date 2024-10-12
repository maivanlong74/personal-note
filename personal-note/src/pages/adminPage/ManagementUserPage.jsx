import { Link } from 'react-router-dom';

export default function ManagementUserPage() {
  return (
    <div className=''>
      <h1 className='text-red-900'>Đây là managment page</h1>
      <div>
        <Link to="/home">Đi đến Client</Link>
      </div>
    </div>
  );
}
