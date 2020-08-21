const IMPORT_REGEXP = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:"(?:.*?)")|(?:'(?:.*?)'))[\s]*?(?:;|$|)/g

const addOriginToImports = (content: string, basepath?: string) =>
  content.replace(IMPORT_REGEXP, substring => {
    let [_import, _from, _end] = substring.split(/'|"/)
    let origin_from = new URL(_from, basepath)
    return `${_import}'${origin_from}'${_end}`
  })

async function importContent(content: string, basepath: string) {
  content = addOriginToImports(content, basepath)
  let blob = new Blob([content], { type: 'text/javascript' })
  let dynamic_url = URL.createObjectURL(blob) + '#'
  try {
    return await import(dynamic_url)
  } finally {
    URL.revokeObjectURL(dynamic_url)
  }
}

export function importModuleContent(
  script: HTMLScriptElement,
  basepath = document.baseURI
) {
  const result = script.src
    ? import(new URL(script.src, basepath).href)
    : importContent(script.innerHTML, basepath)
  return script.type == 'module' ? result : undefined
}
