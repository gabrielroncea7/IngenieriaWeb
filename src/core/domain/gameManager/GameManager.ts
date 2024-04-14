import { Word } from '../word/Word';

class GameManager {
    // Method to generate a random word
    generateWord(): Word {
        // List of sample words for demonstration
        const sampleWords: string[] = ['apple', 'banana', 'orange', 'strawberry', 'pineapple'];

        // Generate a random index to select a word from the list
        const randomIndex: number = Math.floor(Math.random() * sampleWords.length);

        // Create a Word object with the randomly selected word
        return Word.Maker(sampleWords[randomIndex]);
    }

    // Method to check if a word matches a given string
    checkWord(guess: string, word: Word): boolean {
        return guess === word.get();
    }
}

// Example usage:
const gameManager = new GameManager();

// Generate a random word
const wordToGuess = gameManager.generateWord();
console.log('Word to guess:', wordToGuess.get());

// Check if a guess matches the word
const guess = 'banana';
console.log('Is the guess correct?', gameManager.checkWord(guess, wordToGuess));
