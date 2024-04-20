import React from 'react'
import NavBarWebsite from '../../components/NavbarWebsite/NavBarWebsite'
import style from "./website.module.css"
import Banar from './Banar/Banar'
import Offer from './offer/Offer'
import Program from './Program/Program'
import EventStaticWeb from './EventStaticWeb/EventStaticWeb'
import GalleryWebsite from './GalleryWebSite/GalleryWebsite'
import FooterWebsite from '../../components/FooterWebsite/FooterWebsite'
export default function Website() {
  return <>
  <div className={`${style.OfferFontFamily}`}>
      <NavBarWebsite/>
      <Banar/>
      <Offer/>
      <Program/>
      <EventStaticWeb/>
      <GalleryWebsite/>
      <FooterWebsite/>
  </div>
  </>
}
