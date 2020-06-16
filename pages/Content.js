import Slideshow from '../components/Slideshow';

const Content = () => {
  return (
    <div className="content bp3-dark">
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
