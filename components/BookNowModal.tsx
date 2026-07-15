import { useState, useEffect } from 'react'

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  urgency: 'Routine',
  datetime: '',
  address: '',
  notes: ''
}

export default function BookNowModal({ open, onClose }: { open:boolean, onClose: ()=>void }){
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')

  useEffect(()=>{
    if (!open) {
      setStatus('')