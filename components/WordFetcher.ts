import { ADJECTIVES, NOUNS } from "./constants";

class WordFetcher {

    public getNounToInsert(): string {
        return NOUNS[this.getRandom(NOUNS.length)];
    }

    public getAdjectivesToInsert(): Array<string> {
        const number_of_words: number = this.getRandom(4);
        const words_to_return: Array<string> = new Array(number_of_words);
        for (let word in words_to_return) {
            word = this.getUniqueAdjective(words_to_return);
        }
        return words_to_return;
    }

    public getRandom(max: number): number {
        return Math.floor(Math.random() * max);
    }

    public getUniqueAdjective(words_to_return: Array<string>): string {
        let unique_word = false;
        let final_word = '';
        while (!unique_word){
            const potential_word: string = ADJECTIVES[this.getRandom(ADJECTIVES.length)]
            if (!words_to_return.includes(potential_word)) {
                final_word = potential_word;
                unique_word = true;
            }
        }
        return final_word;
    }
}

const wordFetcher = new WordFetcher();
