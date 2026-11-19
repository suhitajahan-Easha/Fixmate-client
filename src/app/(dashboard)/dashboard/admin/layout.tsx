import { requireRole } from '@/lib/serverApi/getApi'
import React from 'react'

const recruiterlayout = async({children}:{children:React.ReactNode}) => {
    await requireRole("admin")
  return children;
}

export default recruiterlayout