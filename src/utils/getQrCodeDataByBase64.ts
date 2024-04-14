import jsQR, { type QRCode } from 'jsqr'

export const getQrCodeDataByBase64 = async (dataUri: string, width: number, height: number): Promise<null | QRCode> => {
  const image = new Image()
  image.src = dataUri
  image.width = width
  image.height = height

  await new Promise(resolve => {
    image.addEventListener('load', resolve)
  })

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext('2d')

  if (!context) {
    return null
  }

  context.imageSmoothingEnabled = false
  context.drawImage(image, 0, 0)
  const imageData = context.getImageData(0, 0, image.width, image.height)

  return jsQR(imageData.data, image.width, image.height)
}
