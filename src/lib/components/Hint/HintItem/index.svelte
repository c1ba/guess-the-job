<script lang="ts">
import { fly } from "svelte/transition";
import type { Option } from "../../../../types";

export let hint: Option;
export let goesBack: boolean | undefined;

const flyDistance = 50;
</script>
<div in:fly={{duration: 500, x: !goesBack ? flyDistance : -(flyDistance)}} out:fly={{duration: 250, x: !goesBack ? -(flyDistance) : flyDistance}}>
    <p>{hint.label}</p>
</div>
<style>
    p {
        font-size: 1.5rem;
        color: #000000;
        text-align: center;
    }
</style>