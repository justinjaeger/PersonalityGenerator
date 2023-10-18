class WordBundler {
    private wordFetcher: WordFetcher

    constructor() {
        this.wordFetcher = new WordFetcher();
    }

    public createBundle(): Object {
        const chosen_words: any = this.chooseWords();
        let bundle = {
            "word_bank": this.wordFetcher.Adjectives.concat(this.wordFetcher.Nouns).sort,
            "todays_words": chosen_words,
            "sentence": this.createSentence(chosen_words)
        } 
        return bundle;
    }

    public chooseWords(): Array<string> {
        const adjectives: Array<string> = this.wordFetcher.getAdjectivesToInsert();
        const todays_words: any = {
            "adjectives": adjectives,
            "noun": null
        };
        const useNounToday: Boolean = Math.random() > .5 ? true : false;
        if (useNounToday) {
            todays_words.noun = this.wordFetcher.getNounToInsert();
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