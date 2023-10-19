import { ADJECTIVES, NOUNS } from "./constants";

type ChosenWords = {
    "adjectives": Array<string>,
    "noun": string
}

export type Bundle = {
    "word_bank": Array<string>,
    "sentence": string
}

export class WordBundler {

    public getSentence(): String {
        const adjectives = this.getAdjectivesToInsert();
        return this.createSentence(adjectives)
    }

    public getBundle(): Bundle {
        const adjectives = this.getAdjectivesToInsert();
        let bundle: Bundle = {
            "word_bank": ADJECTIVES,
            "sentence": this.createSentence(adjectives)
        } 
        return bundle;
    } 

    public createSentence(adjectives: Array<string>): string {
        let descriptors: string = '';
        for (let i = 0; i < adjectives.length; i += 1) {
            console.log("i: ", i);
            console.log("adjectives[i]: ", adjectives[i]);
            // for the last word in the sentence. Prepend 'and' and don't leave a trailing comma or space
            if (i == (adjectives.length - 1) && adjectives.length > 2) {
                descriptors += `and ${adjectives[i]}`;
            } 
            // if there are only two adjectives just link them with an 'and'
            else if (i == (adjectives.length - 1) && adjectives.length == 2) {
                descriptors = descriptors.replace(', ', ' and ')
                descriptors += `${adjectives[i]}`;
            } else if (i == (adjectives.length - 1) && adjectives.length == 1) 
                descriptors += `${adjectives[i]}`;
            else {
                descriptors += `${adjectives[i]}, `;
            }
        }
        const useNounToday: Boolean = Math.random() > .5 ? true : false;
        let sentence = '';
        if (useNounToday) {
            const noun = NOUNS[this.getRandomNumber(NOUNS.length)];
            sentence = `You're a ${descriptors} ${noun} today`;
            return sentence;
        } 
        sentence = `You're ${descriptors} today`;
        return sentence;
    }

    public getAdjectivesToInsert(): Array<string> {
        const number_of_words: number = this.getRandomNumber(4) + 1;
        const words_to_return: Array<string> = [];
        for (let i = 0; i < number_of_words; i += 1) {
            words_to_return.push(this.getUniqueAdjective(words_to_return));
        }
        console.log("words_to_return: ", words_to_return);
        return words_to_return;
    }

    public getRandomNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }

    public getUniqueAdjective(words_to_return: Array<string>): string {
        let unique_word = false;
        let final_word = '';
        while (!unique_word){
            const potential_word: string = ADJECTIVES[this.getRandomNumber(ADJECTIVES.length)];                 console.log("potential_word: "+ potential_word);
            if (!words_to_return.includes(potential_word)) {
                final_word = potential_word;
                unique_word = true;
            }
        }
        console.log("final_word: ", final_word);
        return final_word;
    }
} 