<script lang="ts">
	import { mints } from "../../stores/mints";
	import { token } from "../../stores/tokens";

    function backupTokens(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({proofs: $token, mints: $mints}));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "nutstash_backup.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
</script>
<button class="btn btn-primary" on:click={backupTokens}>
    Backup Tokens
</button>