import React from 'react'
import {useParams} from 'react-router-dom'
import { Header } from '../components/Header'
import { ProfileNavBar } from '../components/ProfileNavBar'
import { RideTable } from '../components/RideTable'

export function Profile() {
    const accountParam = useParams()
    const account = accountParam.account.slice(0,6)
    console.log(account);
  return (
    <>
        <Header/><br/><br/>
        <ProfileNavBar/><br/>
        <RideTable/>
    </>
  )
}
