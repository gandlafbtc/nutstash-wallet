<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import { pop } from "svelte-spa-router";
    import PasswordSetup from "../security/PasswordSetup.svelte";
    import OnboardingHeader from "./OnboardingHeader.svelte";

</script>
<OnboardingHeader></OnboardingHeader>
<div class="h-full w-full flex items-center justify-center">
    <div class="w-80 flex">
        <PasswordSetup></PasswordSetup>
    </div>
</div>