<script lang="ts">
    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";
    let { token, isOpen = $bindable() }: { token: string; isOpen: boolean } =
    $props();

    const colors = ["green", "yellow", "blue"];
    let colorI = 0;
    let nfcColor = $state("blue");

    onMount(() => {
        try {
            const ndef = new NDEFReader();
            console.log(ndef)
            ndef.write(
                "Hello World"
            ).then(() => {
                isOpen = false
                toast.info('Token has been written to nfc tag')
            }).catch(error => {
                console.error(error)
                toast.error('Writing nfc tag has failed')
            });
            
            const interval = setInterval(() => {
                colorI = (colorI + 1) % 3;
                nfcColor = colors[colorI];
            }, 1000);
            return () => {
                clearInterval(interval)
            };
        } catch (error) {
            console.log(error)
            isOpen = false
        }
    });
</script>

<div
            class="flex items-center justify-center transition-colors duration-1000"
            class:text-blue-500={nfcColor === "blue"}
            class:text-yellow-500={nfcColor === "yellow"}
            class:text-green-500={nfcColor === "green"}
        >
            <svg
            class="h-20"
            xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path d="M0 0h24v24H0z" fill="none" /><path
                    d="M4 20h16V4H4v16z"
                    fill="none"
                /><path
                    d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM18 6h-5c-1.1 0-2 .9-2 2v2.28c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V8h3v8H8V8h2V6H6v12h12V6z"
                /></svg
            >
        </div>