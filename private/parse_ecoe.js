var fs = require('fs'),
  Transform = require('stream').Transform,
  _ = require('lodash'),
  LineStream = require('byline').LineStream,
  streamToMongo = require('stream-to-mongo')({db: 'mongodb://127.0.0.1:3001/meteor', collection: 'openings'}),
  parser = new Transform({objectMode: true}),
  opening = {
    eco: '',
    subVariant: 0,
    name: '',
    variation: '',
    pgn: '',
  },
  tokenRe = /"([^"]*)"/,
  subVariantRe = /\/(\d+)/;

// From https://github.com/gouch/to-title-case
function toTitleCase(str) {
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

  return str.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
}

parser._transform = function (data, encoding, done) {
  const line = data.toString('ascii');

  if (line.startsWith('[')) {
    const tag = _.words(line)[0],
      token = tokenRe.exec(line)[1];

    if (tag === 'Event') {
      opening.eco = token;
    } else if (tag === 'ECO') {
      opening.subVariant = parseInt(subVariantRe.exec(line)[1]);
    } else if (tag === 'White') {
      opening.name = toTitleCase(token);
    } else if (tag === 'Black') {
      opening.variation = toTitleCase(token);
    }
  } else if (line.startsWith('*')) {
    this.push(opening);

    // Need to re-initialize
    opening = {
      eco: '',
      subVariant: 0,
      name: '',
      variation: '',
      pgn: '',
    };
  } else {  // The moves played
    // The moves are hard wrapped so keep adding to pgn until we hit the '*'.
    opening.pgn += line;
  }

  done();
};

fs.createReadStream('./private/ecoe.pgn')
  .pipe(new LineStream())
  .pipe(parser)
  .pipe(streamToMongo)
  .on('error', function (e) {
    console.log('ERROR:', opening);
    throw e;
  });