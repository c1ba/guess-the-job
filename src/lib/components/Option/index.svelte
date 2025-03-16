<script lang="ts">
import type {Option} from '../../../types';
import {dataStore, result, setResult} from '$lib';
import confetti from 'canvas-confetti';
import {Spring} from 'svelte/motion';

export let option: Option;

const {getAnswer} = dataStore();
const answer = getAnswer();

const colorArray = ['#bc0000', "#6cbc00", "#00bca8", "#e3ba00", "#7200bc"];
const color = colorArray[Math.floor(Math.random()*colorArray.length)];

const springButton = new Spring({x: 350, y: 150});
const handleAnimation = () => {
    springButton.target = {x: 375, y: 175};
    setTimeout(() => {
        springButton.target = {x: 350, y: 150};
    }, 100);
}
const handleOptionSelect = (_e: MouseEvent & {
    currentTarget: EventTarget & HTMLInputElement;
}
) => {
    if ($result === option.value) {
        return;
    }
    if ($result !== option.value) {
        const element = document.querySelector(`#${$result}`) as HTMLInputElement;
        if (!!element) {
            element.checked = false;
        }
    }

    if (option.value === answer?.value) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                y: 0.6
            }
        });
    }
    setResult(option.value);
    handleAnimation();
}
</script>
<li style={`background-color: ${color}; width: ${springButton.current.x}px !important; height: ${springButton.current.y}px !important;`}>
    <label for={option.value}>{option.label}</label>
    <input type="radio" id={option.value} value={option.value} aria-label={option.label} onclick={handleOptionSelect} disabled={$result === answer?.value} />
</li>
<style>
    li {
        text-decoration: none;
        width: 350px;
        height: 150px;
        max-width: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2px;
        border-radius: 8px;
        padding: 4px;
    }

    label {
        font-weight: 500;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-align: center;
        width: 100%;
        height: 100%;
        color: #FFFFFF;
    }

    input[type="radio"] {
        width: 0px;
        height: 0px;
    }

    li:has(input[type="radio"]:checked) {
        background-color: #FFFFFF !important;
    }
    li:has(input[type="radio"]:checked) > label {
        cursor: default;
        color: #000000 !important;
    }
</style>