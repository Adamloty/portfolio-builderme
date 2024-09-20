import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Your layout structure here */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
