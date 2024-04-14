import React, { useRef, useEffect, type ReactElement } from 'react'
import Webcam from 'react-webcam'
import { getQrCodeDataByBase64 } from '@/utils/getQrCodeDataByBase64'

const SCREENSHOT_WIDTH = 600
const SCREENSHOT_HEIGHT = 400
const INTERVAL_DELAY = 1000 // 1 Sekunde

interface props {
  setQrCodeData: React.Dispatch<React.SetStateAction<string | null>>
  qrCodeData: string | null
}
const ScanQrCode = ({ setQrCodeData, qrCodeData }: props): ReactElement => {
  const videoConstraints = {
    width: SCREENSHOT_WIDTH,
    height: SCREENSHOT_HEIGHT,
    facingMode: 'user'
  }

  const webcamRef = useRef<any>(null)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (webcamRef.current) {
        const dataUri: string = webcamRef.current.getScreenshot()
        const qrData = await getQrCodeDataByBase64(dataUri, SCREENSHOT_WIDTH, SCREENSHOT_HEIGHT)

        if (qrData !== null) {
          setQrCodeData(decodeURIComponent(qrData.data))
          clearInterval(intervalId)
        } else {
          // try again
          console.log('try again...')
        }
      }
    }, INTERVAL_DELAY)

    return () => { clearInterval(intervalId) }
  }, [])

  return (
        <>
          {!qrCodeData && <Webcam
              audio={false}
              height={SCREENSHOT_HEIGHT}
              ref={webcamRef}
              screenshotFormat="image/png"
              width={SCREENSHOT_WIDTH}
              videoConstraints={videoConstraints}
          />}
            {qrCodeData && <p>QR Code Data: {qrCodeData}</p>}
        </>
  )
}

export default ScanQrCode
