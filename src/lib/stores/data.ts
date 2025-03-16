import { PUBLIC_ANSWER_VALUE } from "$env/static/public";
import { get, writable } from "svelte/store";
import type { Option } from "../../types";
const data = writable<{
        options: Option[],
        hints: Option[],
        answerValue: string | undefined
    }>({
        options: [],
        hints: [],
        answerValue: undefined
});

data.set({...get(data), answerValue: PUBLIC_ANSWER_VALUE ? atob(PUBLIC_ANSWER_VALUE) : undefined})

const dataStore = () => {

    const setData = (d: Partial<{options: Option[]; hints: Option[]}>) => {
        const options = d.options;
        const hints = d.hints;
        const prevData = get(data);
        if (options) {
            data.set({...prevData, options: options});
        }
        const updatedData = get(data);
        if (hints) {
            data.set({...updatedData, hints: hints});
        }
    }

    const getOptions = () => get(data).options;
    const getHints  = () => get(data).hints;

    const findOptionByLabel = (label: string) => {
        return get(data).options.find((option) => option.label.toLowerCase() === label.toLowerCase());
    }

    const getAnswer = () => {
        const dS = get(data);
        return dS.options.find((option) => option.value === dS.answerValue);
    };

    const getAnswerValue = () => get(data).answerValue;

    return {
        getOptions,
        getHints,
        setData,
        findOptionByLabel,
        getAnswer,
        getAnswerValue
    }
}

export default dataStore;

