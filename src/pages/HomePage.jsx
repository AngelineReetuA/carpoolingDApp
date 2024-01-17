import React from 'react'
import "../styles/App.css"
import { Header } from '../components/Header'
import { CarLoader } from '../components/Loader'
import { Connection } from '../components/Connection'

export function HomePage(){
  return (
    <>
        <Header/>
        <Connection/>
    </>
  )
}
