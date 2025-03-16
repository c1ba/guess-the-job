<script lang="ts">
import {result, dataStore, setResult} from '$lib';
import confetti from 'canvas-confetti';

const {findOptionByLabel, getAnswer} = dataStore();
const answer = getAnswer();
let validatorTimeout: NodeJS.Timeout | undefined;
const handleInput = (e: Event & {
    currentTarget: EventTarget & HTMLInputElement;
}) => {
    if (!!$result) {
        result.set(undefined);
    }
    if (validatorTimeout) {
        clearTimeout(validatorTimeout);
    }

    validatorTimeout = setTimeout(() => {
        const target = e.target as HTMLInputElement;
        if (target === null) {
            return;
        }
        if (!target.value) {
            return;
        }
        const typedOption = findOptionByLabel(target.value);
        if (!typedOption || (typedOption.value !== answer?.value)) {
            setResult('wrongChoice');
            return;
        }

        if (typedOption && typedOption.value === answer?.value) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.6
                }
            });
            setResult(answer.value);
        }
        setResult(typedOption.value);
    }, 500);
}
</script>
<div>
    <label for="text-answer">I am the</label>
    <input id="text-answer" type="text" placeholder="<insert job here>" oninput={handleInput} disabled={$result === answer?.value}/>
</div>
<style>
    input[type="text"] {
        background-color: transparent;
        border: none;
        border-bottom: solid 1px #FFFFFF;
        padding: 4px 8px;
        width: 200px;
        height: 18px;
        margin-bottom: 6px;
        font-size: 1.5rem;
    }

    label {
        font-size: 1.5rem;
        margin-right: 16px;
    }

    div {
        display: flex;
        margin: 40px 0 22px 0;
        align-items: flex-end;
    }
</style>