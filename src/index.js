function verifyStrategy (strategy) {
  if (!strategy) throw Error('No strategy provided!')

  if (!strategy.encode || typeof strategy.encode !== 'function') throw Error('Strategy lacks encode method!')
  if (!strategy.decode || typeof strategy.decode !== 'function') throw Error('Strategy lacks decode method!')
  if (!strategy.calculateSize || typeof strategy.calculateSize !== 'function') throw Error('Strategy lacks calculateSize method!')
}

export default function steganogre (strategy, existingCanvas) {
  verifyStrategy(strategy)
}
