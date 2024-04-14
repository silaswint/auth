import base32 from 'hi-base32'
import { type Buffer } from 'buffer'

export const base32Encode = (givenString: Buffer): string => {
  return base32.encode(givenString)
}
