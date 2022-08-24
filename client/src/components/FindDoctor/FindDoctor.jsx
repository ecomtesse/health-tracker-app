import { useMemo } from 'react'
// import GoogleMapReact from 'google-map-react'
import './finddoctor.css'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'


const FindDoctor = () => {
  // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA3SadXjt4mmAWr5MWtzYG4Wl3881oHWtQ",
  })

  const Map = () => {
    const center = useMemo(() => ({ lat: -27, lng: 153 }), [])
    
    return (
      <GoogleMap 
        zoom={10} 
        center={{ lat: -27, lng: 153 }} 
        mapContainerClassName="map-container"
      >
        <MarkerF position={{ lat: -27, lng: 153 }}/>
      </GoogleMap>
    )
  }


  if (!isLoaded) return <div>Loading...</div>
  return (
    <Map />
  )
}

export default FindDoctor