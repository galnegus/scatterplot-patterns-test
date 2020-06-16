import Slideshow from '../components/Slideshow';
import NoMobile from '../components/NoMobile';

const Content = () => {
  return (
    <div className="content bp3-dark">
      <NoMobile />
      <Slideshow />
      <style jsx>{`
        .content {
          background: inherit;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}


export default Content;
