const fs = require('fs');
const path = require('path');

exports.seed = async function(knex) {
  const env1Path = path.join(__dirname, '../surf-env/s1.env');
  const env2Path = path.join(__dirname, '../surf-env/s2.env');
  const env1Raw = fs.readFileSync(env1Path, 'utf8');
  const env2Raw = fs.readFileSync(env2Path, 'utf8');

  const rows = [
    ...getRowsFromEnv(env1Raw, 1),
    ...getRowsFromEnv(env2Raw, 2)
  ];
  
  await knex('surf_env').del();

  await knex('surf_env').insert(rows);

  return;
};

function getRowsFromEnv (raw, seasonNum) {
  const envPairs = raw.split('\n');

  const result = [];
  for(stringPair of envPairs) {
  //https://stackoverflow.com/questions/4607745/split-string-only-on-first-instance-of-specified-character
    const splitPair = stringPair.split('=');
    const key = splitPair[0];
    const value = splitPair.slice(1).join('=');

    if(!!key && !!value) result.push({
      season: seasonNum,
      key,
      value
    });
  }

  return result;
}
