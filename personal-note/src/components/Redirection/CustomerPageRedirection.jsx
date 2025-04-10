import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '@contexts/UserContext';
import { FaHouseUser } from "react-icons/fa";

const CustomerPageRedirection = () => {
  const navigate = useNavigate();
  const { setCheckPage } = useUserContext();

  const CustomerPage = () => {
    setCheckPage(false);
    navigate('/home');
  }

  return (
    <div className='bg-slate-400 h-[10%] flex'>
      <div className='w-[50%] h-full p-2 flex items-center'>
        <button onClick={CustomerPage} className='w-[50px] h-[50px]'>
          <FaHouseUser className='w-full h-full' />
        </button>
      </div>
      <div className='w-[50%] h-full p-2'>

      </div>
    </div>
  );
}

export default CustomerPageRedirection;