<script lang="ts">
	import { token } from '../../stores/tokens';
</script>

<div class="flex flex-col w-full h-full items-center justify-center gap-10 ">
	<div class="flex flex-col justify-center items-center">
        <p class="text-8xl">
            {$token.reduce((count, t) => {
                return count + t.amount;
            }, 0)} 
        </p>
		
        <p class="text-4xl">
            satoshi
        </p>
	</div>
	<div>
		<button class="btn btn-primary btn-outline">
			<p>receive</p>
		</button>
		<button class="btn btn-primary">
			<p >send</p>
        </button
		>
	</div>
</div>
