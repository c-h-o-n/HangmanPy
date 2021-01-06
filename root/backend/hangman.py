class Hangman:
    def __init__(self, lives, word):
        self.lives = lives
        self.word = word
        self.wordLength = len(self.word)

        self.guessList = []
        for i in self.word:
            self.guessList.append('_')

        self.currentWord = ""
        for i in self.guessList:
            self.currentWord += i

    def play(self, guessedChar):
        if self.word == self.currentWord:
            print('You win')
        elif self.lives <= 0:
            print('You die')
        else:
            print('Guesses left: ' + str(self.lives))
            print('Your current guess: ' + self.currentWord)

            self.guess(guessedChar)

    def guess(self, guessedChar):
        if guessedChar == '':
            return
        isExist = False

        for i in range(self.wordLength):
            if self.word[i] == guessedChar:
                self.guessList[i] = guessedChar
                isExist = True

        self.currentWord = ""
        for i in self.guessList:
            self.currentWord += i

        if not isExist:
            self.lives -= 1

    def getCurrentWord(self):
        return self.currentWord

    def getLives(self):
        return self.lives
