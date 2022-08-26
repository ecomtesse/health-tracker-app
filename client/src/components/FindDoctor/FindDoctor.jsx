import { useMemo } from 'react'
import { Box, Typography, Container } from '@mui/material'
import './finddoctor.css'
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'
// import Map from './Map'


const FindDoctor = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const Map = () => {
    
    const getLocations = async () => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=-33.8670522,151.1957362&radius=5000&type=doctor`
      try {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      } catch (error) {
        console.log(error.message, "error finding locations");
      }

    }

    // const service = new google.maps.places.PlacesService(map);
    // service.nearbySearch(request, callback);


    
    
    const center = useMemo(() => ({ lat: -27, lng: 153 }), [])
    


    return (
      <Container component="main" align="center" >
        <Typography variant="h4" component="h2" sx={{ my: 2 }}>Find a Doctor</Typography>
        <Typography variant="p" component="p" sx={{  mb: 2 }}>Enter your surburb in the the field below to find a doctor near you. If you require urgent medical attention, please contact '000' immediately.</Typography>

        <Box sx={{ mb: 2 }}>  
          <GoogleMap 
            zoom={11} 
            center={{ lat: -27, lng: 153 }} 
            mapContainerClassName="map-container" 
          >
            <MarkerF position={{ lat: -27, lng: 153 }}/>
          </GoogleMap>
          </Box>
      </Container>
    )
  }


  if (!isLoaded) return <div>Loading...</div>
  return (
    <Map />
  )
}

export default FindDoctor