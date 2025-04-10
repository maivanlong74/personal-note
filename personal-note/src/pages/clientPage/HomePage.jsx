import { Link } from 'react-router-dom';
import AdminPageRedirection from '../../components/Redirection/AdminPageRedirection';

export default function HomePage() {
  return (
    <div className='border border-black w-full h-full'>
      <AdminPageRedirection />
    </div>
  );
}
