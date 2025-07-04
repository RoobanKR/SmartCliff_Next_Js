
import NotFound from '@/components/not-found/NotFound'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import FooterTwo from '@/components/layout/footers/Footer'
import React from 'react'
export const metadata = {
  title: 'Page not found || Smartcliff - Professional Learning And Development company',
  description:
    'Elevate your e-learning content with Smartcliff, the most impressive',
  
}
export default function page() {
  return (
    <div className="main-content  ">

      <Preloader/>

        <div className="content-wrapper js-content-wrapper overflow-hidden">
            {/* <PageLinks/> */}
            <NotFound/>
            <FooterTwo/>
        </div>

    </div>
  )
}
