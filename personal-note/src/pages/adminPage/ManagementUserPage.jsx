import { Link } from 'react-router-dom';
import CustomerPageRedirection from '../../components/Redirection/CustomerPageRedirection';
import { TableComponent } from '../../components/Table/tableComponent';

export default function ManagementUserPage() {
  return (
    <div className='border border-black w-full h-full'>
      <CustomerPageRedirection title='Danh sách người dùng'/>
      <div className='w-full h-full'>
        <div className='w-full h-[20%]'></div>
        <div className='w-full h-[80%] p-8'>
          <TableComponent />
        </div>
      </div>
    </div>
  );
}
