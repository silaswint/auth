import React, { type ReactElement } from 'react'
import { protocolBufferDecode } from '@/utils/protocolBufferDecode'
import EncodeBufferAsBase32 from '@/components/EncodeBufferAsBase32'

const renderTableRow = (key: string, tabularData: any): ReactElement => {
  return (
      <tr>
        <th scope="row">{key}</th>
        {tabularData[key].map((value: string) => {
          return (
              <td key={key}><pre>{value}</pre></td>
          )
        })}
      </tr>
  )
}

interface props {
  qrCodeData: string
}

interface TabularData {
  algorithm: string[]
  counter: string[]
  digits: string[]
  issuer: string[]
  name: string[]
  secret: string[]
  type: string[]
}

const getSubstringAfter = (url: string, delimiter: string): string | null => {
  // Finding the index of the delimiter
  const index = url.indexOf(delimiter)

  // Check whether the delimiter has been found
  if (index === -1) {
    return null // or a suitable error message
  }

  // Extracting the part after the delimiter
  return url.substring(index + delimiter.length)
}

const ProtocolBuffer = ({ qrCodeData }: props): ReactElement => {
  const tabularData: TabularData = {
    algorithm: [],
    counter: [],
    digits: [],
    issuer: [],
    name: [],
    secret: [],
    type: []
  }

  // problem: if URL is something like otpauth-migration://offline?data=a+b it will interpret the '+' as a space
  // const dataQuery = new URL(qrCodeData).searchParams.get('data')

  const dataQuery = getSubstringAfter(qrCodeData, 'data=')

  if (!dataQuery) {
    return <p>No data found</p>
  }

  const otpParameters = protocolBufferDecode(dataQuery).otpParameters
  console.table(otpParameters)

  // Iterate over parameter objects
  otpParameters.forEach((OtpParameters: any) => {
    // Doing this will output enumerated values as defined by the ProtocolBuffer instead of the Integer representation.
    // Note: It will encode the 'secret' as 'base64'... you'll have to stick it back into a Buffer to change the encoding later to 'base32'.
    OtpParameters = JSON.parse(JSON.stringify(OtpParameters))

    // Iterate over parameter properties, assign value to restructured data object.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.keys(tabularData).forEach(function (_key: string) {
      const _value: string | undefined = OtpParameters[_key]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      tabularData[_key].push(_value)
    })
  })

  return <table className="table table-dark">
    <caption>Protocol Buffer Contents</caption>
    <thead>
    <tr>
      <th aria-label="Property Names"></th>
      {tabularData.secret.map(function (_value: string, _key: number) {
        return (<th key={_key}>Export #{+_key + 1}</th>)
      })}
    </tr>
    </thead>
    <tbody>
    {renderTableRow('algorithm', tabularData)}
    {renderTableRow('counter', tabularData)}
    {renderTableRow('digits', tabularData)}
    {renderTableRow('issuer', tabularData)}
    {renderTableRow('name', tabularData)}
    {renderTableRow('secret', tabularData)}
    {renderTableRow('type', tabularData)}
    <tr>
      <th scope="row">Result</th>

      {tabularData.secret.map(function (_value: string, _key: number) {
        const secretBase64 = tabularData.secret[_key]
        return <td key={_key}>
          <EncodeBufferAsBase32 secretBase64={secretBase64}/>
        </td>
      })}
    </tr>
    </tbody>
  </table>
}

export default ProtocolBuffer
