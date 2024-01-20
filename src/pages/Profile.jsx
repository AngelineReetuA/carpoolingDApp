import React from 'react'
import {useParams} from 'react-router-dom'
import { Header } from '../components/Header'

export function Profile() {
    const accountParam = useParams()
    const account = accountParam.account.slice(0,6)
    console.log(account);
  return (
    <>
        <Header/>
        Hi, User Account {account}... !!
    </>
  )
}
