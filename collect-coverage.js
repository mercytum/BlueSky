const fs = require('fs')
const path = require('path')
const v8toIstanbul = require('v8-to-istanbul')

;(async () => {
  const coveragePath = path.resolve(__dirname, 'coverage/js-coverage.json')
  if (!fs.existsSync(coveragePath)) {
    console.error('❌ No coverage data file found at', coveragePath)
    process.exit(1)
  }

  const {result} = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'))
  const outputDir = path.resolve('.nyc_output')
  fs.mkdirSync(outputDir, {recursive: true})

  const transformed = []

  for (const script of result) {
    const {url, functions} = script

    if (!url.startsWith('file://')) continue

    const filePath = url.replace('file://', '')
    if (!fs.existsSync(filePath)) continue

    const converter = v8toIstanbul(filePath)
    await converter.load()
    converter.applyCoverage(functions)
    transformed.push(...converter.toIstanbul())
  }

  const outFile = path.join(outputDir, 'out.json')
  fs.writeFileSync(outFile, JSON.stringify(transformed, null, 2))

  console.log(`✅ Coverage written to ${outFile}`)
})()
