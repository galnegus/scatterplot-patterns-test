import { useEffect, useState } from 'react';
import Slideshow from '../components/Slideshow';

const Content = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function getData() {
      const query = `
        query {
          allSurveys {
            data {
              _id
            }
          }
        }
      `;

      const res = await fetch('/api', {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `query=${query}`
      });

      const newData = await res.json()
      console.log(newData);
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
