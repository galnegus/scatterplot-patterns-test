const secret = process.env.FAUNADB_SECRET_KEY;

export default async (req, res) => {
  const response = await fetch('https://graphql.fauna.com/graphql', {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${secret}`
    }),
    body: JSON.stringify({
     query: `
      query {
        allSurveys {
          data {
            _id
          }
        }
      }
     ` 
    }),
  })

  if (response.ok) {
    const json = await response.json();
    res.status(200).json(json)
  } else {
    res.status(500).json({ error: e.message })
  }
}

/*import faunadb from 'faunadb';

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });


export default async (req, res) => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index('all_surveys') // specify source
          )
        ),
        ref => q.Get(ref) // lookup each result by its reference
      )
    )
    // ok
    res.status(200).json(dbs.data)
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message })
  }
}
*/