import { getAdjectivesToInsert, getNounToInsert } from Words;

class WordBundler {
    private words: Words

    constructor() {
        this.words = new Words();
    }

    public createBundle(): Object {
        const chosen_words = this.chooseWords();
        let bundle = {
            "word_bank": this.words.Adjectives,
            "todays_words": chosen_words
            // "sentence": this.createSentence(chosen_words)
        } 
        return bundle;
    }

    public chooseWords(): Array<string> {
        const todays_words: Array<string> = this.words.getAdjectivesToInsert();
        const useNounToday: Boolean = Math.random() > .5 ? true : false;
        if (useNounToday) {
            todays_words[2] = this.words.getNounToInsert();
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