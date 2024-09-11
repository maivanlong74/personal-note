import { Link } from 'react-router-dom';

export default function ManagementPage() {
  return (
    <div className='w-full flex flex-col justify-start box-border p-[60px]'>
      <h1 className='text-red-900'>Đây là managment page</h1>
      <div>
        <Link to="/home">Đi đến Client</Link>
      </div>
    </div>
  );
}
