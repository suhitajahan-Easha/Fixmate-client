import { requireRole } from '@/lib/serverApi/getApi'
import React from 'react'

const customerlayout = async({children}:{children:React.ReactNode}) => {
    await requireRole("customer")
  return children;
}

export default customerlayout