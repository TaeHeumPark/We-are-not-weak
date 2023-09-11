import { useEffect } from 'react'

export function InputJs1() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.iamport.kr/v1/iamport.js'
    script.async = true
    document.body.appendChild(script)
  })

  return <input />
}

export function InputJs2() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://code.jquery.com/jquery-1.12.4.min.js'
    script.async = true
    document.body.appendChild(script)
  })

  return <input />
}
export function InputJs3() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js'
    script.async = true
    document.body.appendChild(script)
  })

  return <input />
}
