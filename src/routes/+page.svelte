<script lang="ts">
import _ from 'lodash';
import Option from '$lib/components/Option/index.svelte';
import Hints from '$lib/components/Hint/HintContainer/index.svelte';
import ResultInput from '$lib/components/ResultInput/index.svelte';
import type {Option as OptionType} from '../types';
import {timer, result, dataStore} from '$lib';

let gameData: {
    options: OptionType[];
    hints: OptionType[];
} = {
    options: [],
    hints: []
}
let answer: OptionType | undefined;

type JsonGuessMyJob = {
    options: string[];
    hints: string[];
}

// Function to read and parse a JSON file
const readJsonFile = <T>(filePath: string): T | null => {
    try {
        const JSONModule = import.meta.glob('./data.json', {eager: true});
        const data = JSONModule['./data.json'] as T;
        return data;
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return null;
    }
}

const processGameData = (data: JsonGuessMyJob) => {
    const {options, hints} = data;

    return {
        options: options.map((option) => ({label: option, value: _.camelCase(option)})),
        hints: hints.map((option) => ({label: option, value: _.camelCase(option)})),
    }
}

const init = (): void => {
    const jsonData = readJsonFile<JsonGuessMyJob>("./data.json");
        const {setData, getAnswer} = dataStore();

    if (!jsonData || jsonData === null) {
        console.log('Failed to read JSON file.');
        return;
    }

    gameData = processGameData(jsonData);
    setData(gameData);
    answer = getAnswer();
}
init();
</script>
<div role="main" id="main">
    <h1>Guess the Job</h1>
    {#if $timer.timerActivated}
        <h2 class="timer">You have: {$timer.currentTime} seconds remaining!</h2>
    {/if}
    <Hints hints={gameData.hints}/>
    {#if $timer.currentTime > 15}
        <ResultInput />
    {/if}
    {#if $timer.currentTime <= 15}
        <ul>
            {#each gameData.options as option}
                <Option option={option} />
            {/each}
        </ul>
    {/if}
    {#if (!!$result && $result !== answer?.value && !$timer.timerFinished)}
        <p class="answer">Try again!</p>
    {/if}
    {#if (!!$result && $result === answer?.value) && answer}
        <p class="answer">Congratulations! It's {answer.label}!</p>
    {/if}
    {#if ($timer.timerFinished && answer && $result !== answer?.value)}
        <p class="answer">And the answer is... {answer.label}!</p>
    {/if}
</div>
<style>
    #main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 8px 0;
    }

    ul {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        min-height: 300px;
    }

    .answer {
        font-size: 1.5rem;
    }

    .timer {
        font-weight: 400;
    }
</style>
