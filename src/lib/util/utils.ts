import { toast } from '$lib/stores/session/toasts';

function fallbackCopyTextToClipboard(text: string) {
	var textArea = document.createElement('textarea');
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		if (successful) {
			toast( 'copied!', 'info');
		}
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}
export function copyTextToClipboard(text: string) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(
		function () {
			toast( 'copied!', 'info');
		},
		function (err) {
			console.error('Async: Could not copy text: ', err);
		}
	);
}

export const getHostFromUrl = (url: string) => {
	return url.split(":")[1].split('/').join("")
}

export const getCount = (from: number, to: number): number[] => {
	const count = [];
	for (let i = from; i <= to; i++) {
		count.push(i);
	}
	return count;
}