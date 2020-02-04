module.exports = function main(Joke) {
  Joke.prototype.words = function words() {
    return this.text.replace(/\W/g, ' ').toLowerCase().split(' ');
  };

  Joke.validatesUniquenessOf('text');
};
