import { requireRole } from '@/lib/serverApi/getApi'
import React from 'react'

const technicianlayout = async({children}:{children:React.ReactNode}) => {
    await requireRole("technician")
  return children;
}

export default technicianlayout