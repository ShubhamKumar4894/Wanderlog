import React from 'react'
import { UserLists } from '../components/UserLists'
import main_banner from '../../assets/main_banner_bg.png'
export const Users = () => {
    const USERS=[
        {
            id:'u1',
            name:"Shubham",
            image:main_banner,
            places:5
        }
    ]
  return (
    <UserLists items={USERS}/>
  )
}
