module.exports = function main(Joke) {
  Joke.prototype.words = function words() {
    return this.text.split(' ');
  };
};
