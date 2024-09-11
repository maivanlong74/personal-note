
import { Outlet } from 'react-router-dom';
import { HeaderSection } from '@layouts/HeaderSection'
import { FooterSection } from '@layouts/FooterSection'
import { PersonalNoteProvider } from '@contexts/PersonalNoteContext';

export const MainPageLayoutAdmin = () => {
  return (
    <div className='flex flex-col h-screen justify-between mb-24'>
      <PersonalNoteProvider>
        <HeaderSection />
        <Outlet />
        <FooterSection />
      </PersonalNoteProvider>
    </div>
  )
}

