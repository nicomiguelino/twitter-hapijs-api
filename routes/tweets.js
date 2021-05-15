const tweets = [
  {
    userName: 'anthonyedwardstark',
    displayName: 'Tony Stark',
    timeElapsed: '4h',
    content: 'Time to upgrade my Mark V.',
  },
  {
    userName: 'peterparker',
    displayName: 'Peter Parker',
    timeElapsed: '23s',
    content: 'I\'m super excited on my first day at the Stark internship.',
  },
  {
    userName: 'brucebanner',
    displayName: 'Hulk',
    timeElapsed: '4h',
    content: 'Gotta go to dinner date with Nat.',
  },
  {
    userName: 'samwilson',
    displayName: 'The Falcon',
    timeElapsed: '1d',
    content: 'Gotta go fast to get that shield back.',
  },
]

module.exports = [
  {
    method: 'GET',
    path: '/tweets',
    handler: (request, h) => {
      return h.response(tweets).code(200);
    }
  }
];
