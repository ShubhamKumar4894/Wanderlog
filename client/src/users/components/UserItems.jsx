import React from 'react'
import Avatar from '../../shared/components/UIelements/Avatar'
import { Link } from 'react-router-dom'
import Card from '../../shared/components/UIelements/Card'
import "./userItem.css"
export const UserItems = (props) => {
  return (
    <li className='user-item '>
        <Card className='user-item__content'>
          <Link to={`/${props.id}/places`}>   
            <div className='user-item__image'>
                <Avatar image={`${import.meta.env.VITE_ASSET_URL}/${props.image}`} alt={props.name}/>
            </div>
            <div className='user-item__info'>
                <h2 >{props.name}</h2>
                <h3 >{props.placeCount} {props.placeCount===1?'Place':'Places'}</h3>
            </div>
            </Link>
        </Card>
    </li>
  )
}
