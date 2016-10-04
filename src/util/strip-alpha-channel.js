export default function stripAlphaChannel (imageArrayData) {
  const strippedArray = []

  for (let i = 0; i < imageArrayData.length; i += 4) {
    strippedArray.push(
      imageArrayData[i],
      imageArrayData[i + 1],
      imageArrayData[i + 2]
    )
  }

  return strippedArray
}
