import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'

const Home = () => {
  const [user, setUser] = useState(null)
  const [userOverview, setUserOverview] = useState(null)

  const getOverview = async () => {
    const url = '/home'
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    // setUserOverview(data)
  }

  useEffect(() => {
    getOverview()
  }, [])


  return (
      <Container variant="inherit">
        <h1>This is the home page. You should only be able to see it if you are logged in</h1>
      </Container>  
  )
}

export default Home