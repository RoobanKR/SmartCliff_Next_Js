


import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import HeaderSeven from '@/components/layout/headers/HeaderSeven'
import React from 'react'
import FooterTwo from '@/components/layout/footers/Footer'
import Batch from '@/components/batches/Batch'
export const metadata = {
  title: 'Batches || SmartCLiff'  
}
export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <HeaderSeven/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            <PageLinks/>
            <Batch/>
            <FooterTwo/>
        </div>

    </div>
  )
}
