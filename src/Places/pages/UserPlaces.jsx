import React from 'react'
import { useParams } from 'react-router-dom'
import { PlaceLists } from '../components/PlaceLists'
import indiaGate from '../../assets/IndiaGate.png'
const DUMMY_PLACES=[
    {
        id:'U1',
        title:'India Gate',
        description:'This is just another dummy place description',
        imageURL:indiaGate,
        address:'Kartavya Path, India Gate, New Delhi, Delhi 110001',
        location:{
            lat:28.612912,
            lng:77.2269348
        },
        creator:'u1'
    },
    {
        id:'U2',
        title:'Random Place two ',
        description:'This is just second dummy place description',
        imageURL:indiaGate,
        address:'Kartavya Path, India Gate, New Delhi, Delhi 110001',
        location:{
            lat:28.612912,
            lng:77.2269348
        },
        creator:'u2'
    }
]
export const UserPlaces = () => {
    const userId=useParams().userId;
    const loadedPlaces= DUMMY_PLACES.filter(place=>place.creator==userId);
  return (
    <PlaceLists items={loadedPlaces}/>
  )
}
