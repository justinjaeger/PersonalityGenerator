class Words {
    public Adjectives: Array<string>;
    public Nouns: Array<string>;

    constructor() {
        this.Adjectives = [
            "amiable",
            "artful",
            "altruistic",
            "beguiling",
            "big",
            "bucolic",
            "bumptious",
            "captivating",
            "dapper",
            "dashing",
            "ebullient",
            "ephemeral",
            "facetious",
            "flabbergasted",
            "furtive",
            "gargantuan",
            "gregarious",
            "hapless",
            "iconoclastic",
            "incandescent",
            "impish",
            "jocular",
            "jovial",
            "languid",
            "lissome",
            "luminous",
            "mirthful",
            "nebulous",
            "nefarious",
            "opulent",
            "palpable",
            "pensive",
            "prismatic",
            "quixotic",
            "rambunctious",
            "resplendent",
            "sagacious",
            "salubrious",
            "sanguine",
            "slippery",
            "taciturn",
            "tenebrous",
            "ubiquitous",
            "unctuous",
            "unreasonable",
            "vexed",
            "vibrant",
            "verbose",
            "whimsical",
            "winsome",
            "xenial",
            "xenophobic",
            "yawning",
            "yearning",
            "yielding",
            "zealous",
            "zany",
            "zesty"  
        ]

        this.Nouns = [
            "1920s flapper",
            "motherfucker",
            "musk fanboy",
            "table slapper",
            "twitch streamer"   
        ]
    }

    public getNounToInsert(): string {
        return this.Nouns[this.getRandom(this.Nouns.length)];
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
            const potential_word: string = this.Adjectives[this.getRandom(this.Adjectives.length)]
            if (!words_to_return.includes(potential_word)) {
                final_word = potential_word;
                unique_word = true;
            }
        }
        return final_word;
    }
}

const wordFetcher = new WordFetcher();
console.log(wordFetcher.getAdjectivesToInsert())