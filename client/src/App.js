import React, {useEffect, useState} from 'react'

function App() {
  const [data, setData] = useState('');
  const [isFetch, setIsFetch] = useState(false)

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch("http://localhost:9000/testApi/test")
      
      const data = await response.json();
      setData(data)
      setIsFetch(true)
    }
    fetchApi();
  },[])

  console.log(data.character?.realm)
  
  return (
   <div>
    {isFetch ? Object.entries(data.character?.realm).map(([key, value]) => {
      return <p key={key}>{value}
        
      </p>
    }) : <p>nie dziala</p>}
   </div>
  );
}

export default App;
