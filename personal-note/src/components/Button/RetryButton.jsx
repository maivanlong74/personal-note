import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom';

export const RetryButton = () => {

  const navigate = useNavigate()
  const onRetry = () => {
    navigate('/')
  }

  return (
    <div>
      <Button variant='outlined' color='white' onClick={onRetry}>
        <div className='flex flex-row items-center justify-center'>
          <svg className="w-6 h-6 text-whit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
          </svg>
          <div className='ml-3'></div>
          retry
        </div>
      </Button>
    </div>
  );
}
