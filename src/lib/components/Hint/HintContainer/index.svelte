<script lang="ts">
import type { Option } from "../../../../types";
import {startTimer, timer} from '$lib';
import HintItem from '../HintItem/index.svelte';
export let hints: Option[];
let currentIndex = 0;
let goesBack = false;

const handlePrevHint = () => {
    if (currentIndex > 0) {
        currentIndex -= 1;
        goesBack = true;
    }
}

const handleNextHint = () => {
    if (currentIndex < hints.length - 1) {
        currentIndex += 1;
        goesBack = false;
    }
    if (currentIndex === hints.length - 1 && !$timer.timerActivated) {
        startTimer();
    }
}
</script>
<div id="hint-card">
    <h2 id="hints-card-title">Hints</h2>
    <div id="hint-mng">
        <button onclick={handlePrevHint} disabled={currentIndex === 0}>◄</button>
        {#each hints as hint, idx}
            {#if idx === currentIndex}
                <HintItem hint={hint} goesBack={goesBack} />
            {/if}
        {/each}
        <button onclick={handleNextHint} disabled={currentIndex === hints.length - 1}>►</button>
    </div>
</div>
<style>
    @media(min-width: 816px) {
        div {
            width: 750px;
        }
    }
    @media(max-width: 816px) {
        div {
            width: 80vw;
        }
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }

    #hint-card {
        border-radius: 8px;
        background-color: #fdf4cd;
        border: solid 1px #404040;
    }

    #hint-mng {
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
        height: 85px;
    }

    button {
        cursor: pointer;
        text-decoration: none;
        background: transparent;
        border: none;
        color: #000000;
        height: 100%;
        width: 100px;
    }

    #hints-card-title {
        background-color: #e1b800;
        text-align: center;
        padding-bottom: 16px;
        padding-top: 16px;
        width: 100%;
        margin-top: 0;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
</style>