import { useEffect, useState } from 'react';
import Slideshow from '../components/Slideshow';

const Content = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function getData() {
      const res = await fetch('/api')
      const newData = await res.json()
      setData(newData)
    }
    getData()
  }, [])

  // <p>{JSON.stringify(data)}</p>

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
