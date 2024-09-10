'use client';
import React, { useTransition } from 'react'
 
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { createNewDocument } from '@/actions/actions';

export const NewDocumentButton = () => {
  const [isPeding,startTransition]=useTransition();
  const router = useRouter();
  const handleCreateNewDocument=()=>{
    startTransition(async()=>{
      const {docId}=await createNewDocument();
      router.push(`/doc/${docId}`)
    })

  }
  return (
    <div>
        <Button onClick={handleCreateNewDocument} disabled={isPeding}>New Document</Button>
    </div>
  )
}
