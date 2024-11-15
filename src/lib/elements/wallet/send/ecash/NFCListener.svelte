<script>
    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";
    import { push } from "svelte-spa-router";


    let scanned = $state('')

    onMount(()=> {
        const abortController = new AbortController();
            const ndef = new NDEFReader();
            ndef.scan({signal: abortController}).then(() => {
            toast.info('Scanning for NFC tag')
            ndef.onreadingerror = () => {
                console.log("Cannot read data from the NFC tag. Try another one?");
                toast.error('Error reading from tag')
            };
            ndef.onreading = event => {
                scanned = ''
                const message = event.message
                for (const record of message.records) {
                    if (record.recordType !== 'text') {
                        continue
                    }
                    const textDecoder = new TextDecoder(record.encoding);
                    const decoded = textDecoder.decode(record.data)
                    scanned = scanned + decoded
                }
                if (scanned.startsWith('cashu')) {
                    toast.info('Cashu token scanned')
                    push('/wallet/receive/cashu/'+scanned)
                }
                else {
                    toast.warning('Scanned tag was not a cashu token: ' + scanned)
                }
            };
            }).catch(error => {
            console.log(`Error! Scan failed to start: ${error}.`);
            })
        return ()=> {
            
            abortController.abort()
        }

    }) 
</script>

<div class="flex items-center justify-center">
    <div class="relative bg-green-500 rounded-full w-1 h-1">
    </div>
    <div class="absolute bg-green-500 rounded-full w-2 h-2 animate-ping">
    </div>
</div>