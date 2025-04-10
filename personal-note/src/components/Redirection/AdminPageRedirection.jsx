import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '@contexts/UserContext';

const AdminPageRedirection = () => {
  const navigate = useNavigate();
  const { setCheckPage } = useUserContext();

  const AdminPage =()=>{
    setCheckPage(true);
    navigate('/management');
  }

  return (
    <div className='bg-slate-400 p-8'>
      <h1 className='text-red-900'>Đây là home page</h1>
      <div>
        <button onClick={AdminPage}>Đi đến Admin</button>
      </div>
    </div>
  );
}

export default AdminPageRedirection;