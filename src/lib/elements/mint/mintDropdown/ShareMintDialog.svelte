<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Dialog  from "$lib/components/ui/dialog";
	import QrCode from "$lib/elements/ui/QRCode.svelte";
    type Props = {
        url:string,
        isOpen:boolean
    }
    let {url, isOpen=$bindable()}: Props =$props()
    

</script>


<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Share Mint</Dialog.Title>
			<Dialog.Description></Dialog.Description>
		</Dialog.Header>
		<div class="flex h-72 flex-col gap-2">
			<QrCode data={url}>

            </QrCode>
		</div>
		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={() => {
					isOpen = false;
				}}
			>
				Close
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>