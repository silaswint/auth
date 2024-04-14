import React, { useState } from 'react'
import ScanQrCode from '@/components/ScanQrCode'
import Container from '@mui/material/Container'
import ProtocolBuffer from '@/components/ProtocolBuffer'

const App: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)

  return (
        <Container maxWidth="md" style={{ marginTop: '4rem' }}>
          {!qrCodeData && <ScanQrCode setQrCodeData={setQrCodeData} qrCodeData={qrCodeData} />}
          {qrCodeData && <ProtocolBuffer qrCodeData={qrCodeData} />}
        </Container>
  )
}

export default App
