"use client";
import { BunkMasterProComponent } from '@/components/bunk-master-pro';
import { Analytics } from "@vercel/analytics/react"
import { useEffect } from 'react';

import React from 'react'

const Page = () => {
  useEffect(() => {
    if (!navigator.serviceWorker.controller) {
      navigator.serviceWorker.register("/service-worker.js").then(function (reg) {
        console.log("Service worker has been registered for scope: " + reg.scope);
      });
    }
    
  }, [])

  return (
    <div>

      <Analytics />
      <BunkMasterProComponent />
    </div>
  )
}

export default Page;
