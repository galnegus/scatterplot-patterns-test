const NoMobile = () => {
  return (
    <div className="no-mobile">
      <div className="content bp3-running-text">
        <h1 className="bp3-heading">Window Too Small</h1>
        <p className="bp3-text-muted bp3-text-large">
          It appears you are visiting this survey on a smartphone or equivalent (smaller) screen.
          To participate in the survey, please visit the site on a PC and maximize the browser window.
        </p>
      </div>
      
      <style jsx>{`
        .no-mobile {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #10161A;
          z-index: 50;

          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        @media only screen and (min-width: 1200px) {
          .no-mobile {
            display: none;
          }
        }

        .content {
          max-width: 500px;
          max-height: 500px;
          padding: 10px;
        }
      `}</style>
      
    </div>
  );
};

export default NoMobile;
