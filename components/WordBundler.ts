import { WordFetcher } from './WordFetcher';
import { ADJECTIVES, NOUNS } from "./constants";

type ChosenWords = {
    "adjectives": Array<string>,
    "noun": string
}

type Bundle = {
    "todays_words": ChosenWords,
    "sentence": string
}

class WordBundler {
    private wordFetcher: WordFetcher;

    constructor() {
        this.wordFetcher = new WordFetcher();
    }

    public createBundle(): Object {
        const chosen_words = this.chooseWords();
        let bundle = {
            "word_bank": ADJECTIVES,
            "todays_words": chosen_words
            // "sentence": this.createSentence(chosen_words)
        } 
        return bundle;
    }

    public chooseWords(): Array<string> {
        const todays_words: Array<string> = this.wordFetcher.getAdjectivesToInsert();
        const useNounToday: Boolean = Math.random() > .5 ? true : false;
        if (useNounToday) {
            todays_words[2] = this.wordFetcher.getNounToInsert();
        }
        return todays_words;
    }

    // public createSentence(chosen_words): string {
    //     const sentence: string = '';
    //     const useNounToday: Boolean = Math.random() > .5 ? true : false;
    //     if (useNounToday) {
    //         const noun = this.words.getNounToInsert;
    //     }
    //     return sentence;
    // }
} 