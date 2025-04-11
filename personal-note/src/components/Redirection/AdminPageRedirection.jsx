import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserContext } from '@contexts/UserContext';
import { RiAdminFill } from "react-icons/ri";

const AdminPageRedirection = () => {
  const navigate = useNavigate();
  const { userProfile, setcheckPageAdmin } = useUserContext();
  const [roles, setRoles] = useState(userProfile?.roles);

  useEffect(() => {
    const ensureAuthorized = () => {
      if (!userProfile) {
        return;
      }
      if (!userProfile.roles) {
        navigate('/error');
        return;
      }

      setRoles(userProfile.roles);
    };
    ensureAuthorized();
  }, [userProfile]);

  const AdminPage = () => {
    setcheckPageAdmin(true);
    navigate('/management');
  }

  return (
    <div className='bg-slate-400 h-[10%] flex'>
      <div className='w-[50%] h-full p-2 flex items-center'>
        <button onClick={AdminPage} className='w-[50px] h-[50px]'
          disabled={roles != 'admin'}>
          <RiAdminFill className='w-full h-full' />
        </button>
      </div>
      <div className='w-[50%] h-full p-2'>

      </div>
    </div>
  );
}

export default AdminPageRedirection;