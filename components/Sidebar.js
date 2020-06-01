import { Card } from '@blueprintjs/core';

const Sidebar = ({ children }) => {

  return (
    <Card className='card-sidebar' elevation={2}>
      <div className="vertical-center">
        { children }
      </div>
      <style jsx>{`
        .vertical-center {
          display: flex;
          align-items: center;
          height: 100%;
          text-align: center;
          justify-content: center;
          flex-direction: column;
        }
      `}</style>
      <style jsx global>{`
        .card-sidebar {
          width: 300px;
          border-radius: 0;
          overflow-y: scroll;
          overflow-x: hidden;
        }
      `}</style>
    </Card>
  );
};

export default Sidebar;