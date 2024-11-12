<script lang="ts">
    import { getDivider } from "$lib/util/utils";
    import { getUnitSymbol } from "$lib/util/walletUtils";
    import NumberFlow from "@number-flow/svelte";

    let { unit, amount}: {unit: string, amount: number} = $props()
    let {divider, fraction} = $derived(getDivider(unit))

</script>

<p class="">
    <NumberFlow value={amount/divider} format={{ minimumFractionDigits: fraction, maximumFractionDigits: fraction}}></NumberFlow> {getUnitSymbol(unit, false)}
    <span class="text-xs">
      {(unit)}
    </span>
  </p>