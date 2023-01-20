<script lang="ts">
	import { CashuWallet } from '@gandlaf21/cashu-js';
	import * as rp from 'nostr-relaypool';

	import * as nostrTools from 'nostr-tools';
	import type { NostrMessage } from 'src/model/nostrMessage';
	import { nostrPool, useNostr, nostrRelays as relays, nostrPubKey, nostrPrivKey, nostrMessages } from '../../stores/nostr';
	import { isValidToken } from '../util/walletUtils';

	if ($useNostr) {
		nostrPool.set(new rp.RelayPool($relays));
		$nostrPool?.subscribe(
			[{ kinds: [nostrTools.Kind.EncryptedDirectMessage], limit: 10, '#p': [$nostrPubKey]}],
			$relays,
			async (event, isAfterEose, relayURL) => {
                console.log(event)
                if ($nostrMessages.map((message)=>message.event.id).includes(event.id)) {
                    //if token is already stored, do nothing
                    return
                }
                if (!nostrTools.validateEvent(event)){
                    //if an event is invalid, ignore it
                    return 
                }
                const decodedMessage  = await nostrTools.nip04.decrypt($nostrPrivKey,event.pubkey,event.content)
                const decodedTokens = CashuWallet.getDecodedProofs(decodedMessage)

                if (!isValidToken(decodedTokens)){
                    // ignore messages that are not tokens
                    return
                }
                
                const nostrMessage: NostrMessage = {
                    event,
                    token: decodedTokens,
                    isAccepted: false
                }
                nostrMessages.update((state)=>[nostrMessage, ...state])
            },
			undefined,
			(events, relayURL) => {
				console.log(events, relayURL);
			}
		);

		$nostrPool.onerror = (err) => {
			console.log('RelayPool error', err);
		};
		$nostrPool.onnotice((notice) => {
			console.log('RelayPool notice', notice);
		});
	} else {
		console.log('nonostr..');
	}
</script>