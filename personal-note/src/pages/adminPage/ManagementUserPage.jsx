import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import CustomerPageRedirection from '../../components/Redirection/CustomerPageRedirection';
import { TableComponent } from '../../components/Table/tableComponent';

export default function ManagementUserPage() {
  return (
    <div className='border border-black w-full h-full flex flex-col'>
      <CustomerPageRedirection title='Danh sách người dùng' />
      <div id='search-user' className='p-1 flex space-x-2'>
        <div className="relative w-[30%]">
          <input
            type="text"
            placeholder='Vui lòng nhập thông tin ...'
            className='p-2 pl-8 border rounded-xl w-full'
          />
          <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button className='bg-gray-700 text-white p-2 border rounded-xl'>search</button>
      </div>
      <div className='flex-1 w-full relative'>
        <div className='w-full h-full absolute'>
          <TableComponent />
        </div>
      </div>
    </div>
  );
}
