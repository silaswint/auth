import protobufjs from 'protobufjs'
import protocol from './google_auth.proto.json'
import { Buffer } from 'buffer'

export const protocolBufferDecode = (dataString: string): any => {
  const root = protobufjs.Root.fromJSON(protocol)
  const theMessage = root.lookupType('MigrationPayload')

  const buffer = Buffer.from(dataString, 'base64')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return theMessage.decode(buffer)
}
