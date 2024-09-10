
import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import { useUserContext } from '@contexts/UserContext';

export default function HomePage() {
  const { userProfile } = useUserContext();
  // const [testUser, setTestUser] = useState([]);
  // useEffect(() => {
  //   UserService.getAll().then(
  //     (res) => {
  //       if (Object.keys(res).length > 0) {
  //         setTestUser(res)
  //       }
  //     }
  //   );
  // }, []);

  return (
    <div>
      <h1>Đây là home page</h1>
    </div>
  );
}
