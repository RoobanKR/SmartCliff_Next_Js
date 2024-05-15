import NotFound from '@/components/not-found/NotFound'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import FooterTwo from '@/components/layout/footers/Footer'
import React from 'react'
import HeaderSeven from '@/components/layout/headers/HeaderSeven'

export default function page() {
  return (
    <div className="main-content  ">

      <Preloader/>

        <HeaderSeven/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            {/* <PageLinks/> */}
            <NotFound/>
            <FooterTwo/>
        </div>

    </div>
  )
}
