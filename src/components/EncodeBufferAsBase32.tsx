import React, { type ReactElement } from 'react'
import { Buffer } from 'buffer'
import { base32Encode } from '@/utils/base32Encode'

interface props {
  secretBase64: string
}

const EncodeBufferAsBase32 = ({ secretBase64 }: props): ReactElement => {
  const buffer = Buffer.from(secretBase64, 'base64')
  const secretEncoded = base32Encode(buffer)

  return <input value={secretEncoded} disabled/>
}

export default EncodeBufferAsBase32
