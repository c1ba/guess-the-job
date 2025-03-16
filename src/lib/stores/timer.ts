import { get, writable } from "svelte/store";
import {result} from './result';
import dataStore from "./data";

const START_TIME_IN_SEC = 120;

export const timer = writable({
    currentTime: START_TIME_IN_SEC,
    timerFinished: false,
    timerActivated: false,
});

const {getAnswerValue} = dataStore();

export const startTimer = () => {
    const t = get(timer);
    if (!t.timerActivated) {
        timer.set({...t, timerActivated: true});
        const interval = setInterval(() => {
        const timerData = get(timer);
        const selectedOption = get(result);
        if (timerData.currentTime === 0 || selectedOption === getAnswerValue()) {
            timer.set({...timerData, timerFinished: true, timerActivated: false})
            clearInterval(interval);
            return;
        }
        if (!timerData.timerActivated) {
            timer.set({...timerData, timerActivated: true});
        }
        const leftTime = timerData.currentTime - 1;
        timer.set({...timerData, currentTime: leftTime})
    }, 1000);
    }
}