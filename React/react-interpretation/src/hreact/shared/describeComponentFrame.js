const BEFORE_SLASH_RE = /^(.*)[\\\/]/

export default function(name, source, ownerName) {
	let sourceInfo = ''
	if (source) {
		let path = source.fileName
		let fileName = path.replace(BEFORE_SLASH_RE, '')
		if (__DEV) {
			if (/^index\./.test(fileName)) {
				const match = path.match(BEFORE_SLASH_RE)
				if (match) {
					const pathBeforeSlash = match[1]
					if (pathBeforeSlash) {
						const folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '')
						fileName = folderName + '/' + fileName
					}
				}
			}
		}
		sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')'
	} else {
		sourceInfo = ' (created by ' + ownerName + ')'
	}
	return '\n     in ' + (name || 'Unknown') + sourceInfo
}
