export function getMessage(s:string){
	const msg = chrome.i18n.getMessage(s)
	return msg
}

