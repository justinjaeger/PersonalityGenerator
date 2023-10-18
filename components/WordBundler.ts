import { getNounToInsert, getAdjectivesToInsert} from './WordFetcher';

type ChosenWords = {
    "adjectives": Array<string>,
    "noun": string
}

type Bundle = {
    "todays_words": ChosenWords,
    "sentence": string
}
 
export const wordBundler = () => {

}

    public createBundle(): Object {
        const chosen_words: ChosenWords = this.chooseWords();
        let bundle = {
            "todays_words": chosen_words,
            "sentence": this.createSentence(chosen_words)
        } 
        return bundle;
    }

    public chooseWords(): ChosenWords {
        const adjectives: Array<string> = getAdjectivesToInsert();
        const todays_words: ChosenWords = {
            "adjectives": adjectives,
            "noun": null
        };
        const useNounToday: Boolean = Math.random() > .5 ? true : false;
        if (useNounToday) {
            todays_words.noun = getNounToInsert();
        }
        return todays_words;
    }

    public createSentence(chosen_words): string {
        let sentence = ''
        if (chosen_words.noun == null) {
            sentence = "Today you're " + chosen_words.adjectives[0] + ", " + chosen_words.adjectives[1] + ', ' + chosen_words.adjectives[2];
        } else {
            sentence = "Today you're a" + chosen_words.adjectives[0] + " and " + chosen_words.adjectives[1] + ' ' + chosen_words.noun;
        }
        return sentence;
    }
} 