
import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';

export default function HomePage() {
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

  // useEffect(() => {
  //   console.log("testUser: ", testUser);
    
  // }, [testUser]);

  return (
    <div>
      <h1>Đây là home page</h1>
    </div>
  );
}
