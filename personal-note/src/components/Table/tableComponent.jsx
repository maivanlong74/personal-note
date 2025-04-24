
export const TableComponent = ({}) => {

  return (
    <table class="table-auto w-full">
      <thead className='border-2 border-black'>
        <tr>
          <th className='border-2 border-black'>No</th>
          <th className='border-2 border-black'>Họ và tên</th>
          <th className='border-2 border-black'>Số điện thoại</th>
          <th className='border-2 border-black'>mã note</th>
          <th className='border-2 border-black'></th>
        </tr>
      </thead>
      <tbody className='border border-black'>
        <tr className='border border-black'>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
          <td>#5647654</td>
          <td><button className=''>delete</button></td>
        </tr>
        <tr className='border border-black'>
          <td>Witchy Woman</td>
          <td>The Eagles</td>
          <td>1972</td>
          <td>#5647655</td>
          <td><button className=''>delete</button></td>
        </tr>
        <tr className='border border-black'>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
          <td>#5647656</td>
          <td><button className=''>delete</button></td>
        </tr>
      </tbody>
    </table>
  )
}
