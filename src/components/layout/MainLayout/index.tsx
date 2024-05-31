import { ReactNode } from 'react';
import Footer from '../../common/Footer';
import Navbar from '../../common/Navbar';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
