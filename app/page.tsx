import { BunkMasterProComponent } from '@/components/bunk-master-pro';
import { Analytics } from "@vercel/analytics/react"

import React from 'react'

const Page = () => {
  return (
    <div>
      <Analytics />
      <BunkMasterProComponent />
    </div>
  )
}

export default Page;
