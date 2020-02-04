module.exports = function main(Joke) {
  Joke.prototype.words = function words() {
    return this.text.replace(/\W/g, ' ').toLowerCase().split(' ');
  };

  Joke.frequency = function frequency(jokes) {
    const results = {};

    jokes.forEach((joke) => {
      joke.words().forEach((word) => {
        if (!!word) {
          let n = results[word] || 0;
          n += 1;
          results[word] = n;
        }
      });
    });

    return results;
  };
};
