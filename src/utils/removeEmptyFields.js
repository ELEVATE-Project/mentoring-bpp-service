'use strict'

const removeEmptyFields = (obj) => {
	if (Array.isArray(obj)) return obj.map(removeEmptyFields).filter((val) => val)
	if (typeof obj !== 'object' || obj === null) return obj
	for (let key in obj) {
		if (obj[key] === '') delete obj[key]
		else {
			obj[key] = removeEmptyFields(obj[key])
			if (!obj[key]) {
				delete obj[key]
			}
		}
	}
	return Object.keys(obj).length ? obj : undefined
}

module.exports = { removeEmptyFields }
