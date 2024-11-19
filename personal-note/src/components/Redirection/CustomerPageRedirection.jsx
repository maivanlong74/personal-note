import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '@contexts/UserContext';

const CustomerPageRedirection = () => {
  const navigate = useNavigate();
  const { setCheckPage } = useUserContext();

  const CustomerPage =()=>{
    setCheckPage(false);
    navigate('/home');
  }

  return (
    <div className=''>
      <h1 className='text-red-900'>Đây là managment page</h1>
      <div>
        <button onClick={CustomerPage}>Đi đến Client</button>
      </div>
    </div>
  );
}

export default CustomerPageRedirection;