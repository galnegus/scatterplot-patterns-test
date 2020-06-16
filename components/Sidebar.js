import { Card } from '@blueprintjs/core';

const Sidebar = ({ children }) => {

  return (
    <Card className='card-sidebar' elevation={2}>
      { children }
      <style jsx>{`
        
      `}</style>
      <style jsx global>{`
        .card-sidebar {
          width: 300px;
          border-radius: 0;
          overflow-y: scroll;
          overflow-x: hidden;
          z-index: 5;
          position: relative;
        }
      `}</style>
    </Card>
  );
};

export default Sidebar;