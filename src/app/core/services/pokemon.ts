export interface Pokemon {}

export const specialForms:any = {
  // Gen 3 Base
  deoxys: [
    { id: 386, endpoint: 'deoxys-normal', generation: 'generation-iii', region: 'hoenn' },
    { id: 10001, endpoint: 'deoxys-attack', generation: 'generation-iii', region: 'hoenn' },
    { id: 10002, endpoint: 'deoxys-defense', generation: 'generation-iii', region: 'hoenn' },
    { id: 10003, endpoint: 'deoxys-speed', generation: 'generation-iii', region: 'hoenn' },
  ],

  // Gen 4 Base
  wormadam: [
    { id: 413, endpoint: 'wormadam-plant', generation: 'generation-iv', region: 'sinnoh' },
    { id: 10004, endpoint: 'wormadam-sandy', generation: 'generation-iv', region: 'sinnoh' },
    { id: 10005, endpoint: 'wormadam-trash', generation: 'generation-iv', region: 'sinnoh' },
  ],
  giratina: [
    { id: 487, endpoint: 'giratina-altered', generation: 'generation-iv', region: 'sinnoh' },
    { id: 10007, endpoint: 'giratina-origin', generation: 'generation-iv', region: 'sinnoh' },
  ],
  shaymin: [
    { id: 492, endpoint: 'shaymin-land', generation: 'generation-iv', region: 'sinnoh' },
    { id: 10008, endpoint: 'shaymin-sky', generation: 'generation-iv', region: 'sinnoh' },
  ],

  // Gen 5 Base
  basculin: [
    { id: 550, endpoint: 'basculin-red-striped', generation: 'generation-v', region: 'unova' },
    { id: 10016, endpoint: 'basculin-blue-striped', generation: 'generation-v', region: 'unova' },
    {
      id: 10246,
      endpoint: 'basculin-white-striped',
      generation: 'generation-viii',
      region: 'hisui',
    }, // Introduced in Legends: Arceus
  ],
  darmanitan: [
    { id: 555, endpoint: 'darmanitan-standard', generation: 'generation-v', region: 'unova' },
    { id: 10017, endpoint: 'darmanitan-zen', generation: 'generation-v', region: 'unova' },
    {
      id: 10177,
      endpoint: 'darmanitan-galar-standard',
      generation: 'generation-viii',
      region: 'galar',
    }, // Galarian variant
    { id: 10178, endpoint: 'darmanitan-galar-zen', generation: 'generation-viii', region: 'galar' },
  ],
  tornadus: [
    { id: 641, endpoint: 'tornadus-incarnate', generation: 'generation-v', region: 'unova' },
    { id: 10019, endpoint: 'tornadus-therian', generation: 'generation-v', region: 'unova' },
  ],
  thundurus: [
    { id: 642, endpoint: 'thundurus-incarnate', generation: 'generation-v', region: 'unova' },
    { id: 10020, endpoint: 'thundurus-therian', generation: 'generation-v', region: 'unova' },
  ],
  landorus: [
    { id: 645, endpoint: 'landorus-incarnate', generation: 'generation-v', region: 'unova' },
    { id: 10021, endpoint: 'landorus-therian', generation: 'generation-v', region: 'unova' },
  ],
  keldeo: [
    { id: 647, endpoint: 'keldeo-ordinary', generation: 'generation-v', region: 'unova' },
    { id: 10024, endpoint: 'keldeo-resolute', generation: 'generation-v', region: 'unova' },
  ],
  meloetta: [
    { id: 648, endpoint: 'meloetta-aria', generation: 'generation-v', region: 'unova' },
    { id: 10025, endpoint: 'meloetta-step', generation: 'generation-v', region: 'unova' },
  ],

  // Gen 6 Base
  meowstic: [
    { id: 678, endpoint: 'meowstic-male', generation: 'generation-vi', region: 'kalos' },
    { id: 10025, endpoint: 'meowstic-female', generation: 'generation-vi', region: 'kalos' },
  ],
  aegislash: [
    { id: 681, endpoint: 'aegislash-shield', generation: 'generation-vi', region: 'kalos' },
    { id: 10026, endpoint: 'aegislash-blade', generation: 'generation-vi', region: 'kalos' },
  ],
  pumpkaboo: [
    { id: 710, endpoint: 'pumpkaboo-average', generation: 'generation-vi', region: 'kalos' },
    { id: 10027, endpoint: 'pumpkaboo-small', generation: 'generation-vi', region: 'kalos' },
    { id: 10028, endpoint: 'pumpkaboo-large', generation: 'generation-vi', region: 'kalos' },
    { id: 10029, endpoint: 'pumpkaboo-super', generation: 'generation-vi', region: 'kalos' },
  ],
  gourgeist: [
    { id: 711, endpoint: 'gourgeist-average', generation: 'generation-vi', region: 'kalos' },
    { id: 10030, endpoint: 'gourgeist-small', generation: 'generation-vi', region: 'kalos' },
    { id: 10031, endpoint: 'gourgeist-large', generation: 'generation-vi', region: 'kalos' },
    { id: 10032, endpoint: 'gourgeist-super', generation: 'generation-vi', region: 'kalos' },
  ],
  hoopa: [
    { id: 720, endpoint: 'hoopa-confined', generation: 'generation-vi', region: 'kalos' },
    { id: 10086, endpoint: 'hoopa-unbound', generation: 'generation-vi', region: 'kalos' },
  ],

  // Gen 7 Base
  wishiwashi: [
    { id: 746, endpoint: 'wishiwashi-solo', generation: 'generation-vii', region: 'alola' },
    { id: 10127, endpoint: 'wishiwashi-school', generation: 'generation-vii', region: 'alola' },
  ],
  lycanroc: [
    { id: 745, endpoint: 'lycanroc-midday', generation: 'generation-vii', region: 'alola' },
    { id: 10125, endpoint: 'lycanroc-midnight', generation: 'generation-vii', region: 'alola' },
    { id: 10152, endpoint: 'lycanroc-dusk', generation: 'generation-vii', region: 'alola' },
  ],
  minior: [
    { id: 774, endpoint: 'minior-red-meteor', generation: 'generation-vii', region: 'alola' },
    { id: 10130, endpoint: 'minior-orange-meteor', generation: 'generation-vii', region: 'alola' },
    { id: 10131, endpoint: 'minior-yellow-meteor', generation: 'generation-vii', region: 'alola' },
    { id: 10132, endpoint: 'minior-green-meteor', generation: 'generation-vii', region: 'alola' },
    { id: 10133, endpoint: 'minior-blue-meteor', generation: 'generation-vii', region: 'alola' },
    { id: 10134, endpoint: 'minior-indigo-meteor', generation: 'generation-vii', region: 'alola' },
    { id: 10135, endpoint: 'minior-violet-meteor', generation: 'generation-vii', region: 'alola' },
    { id: 10136, endpoint: 'minior-red', generation: 'generation-vii', region: 'alola' },
    { id: 10137, endpoint: 'minior-orange', generation: 'generation-vii', region: 'alola' },
    { id: 10138, endpoint: 'minior-yellow', generation: 'generation-vii', region: 'alola' },
    { id: 10139, endpoint: 'minior-green', generation: 'generation-vii', region: 'alola' },
    { id: 10140, endpoint: 'minior-blue', generation: 'generation-vii', region: 'alola' },
    { id: 10141, endpoint: 'minior-indigo', generation: 'generation-vii', region: 'alola' },
    { id: 10142, endpoint: 'minior-violet', generation: 'generation-vii', region: 'alola' },
  ],

  // Gen 8 Base
  toxtricity: [
    { id: 849, endpoint: 'toxtricity-amped', generation: 'generation-viii', region: 'galar' },
    { id: 10161, endpoint: 'toxtricity-low-key', generation: 'generation-viii', region: 'galar' },
  ],
  eiscue: [
    { id: 875, endpoint: 'eiscue-ice', generation: 'generation-viii', region: 'galar' },
    { id: 10184, endpoint: 'eiscue-noice', generation: 'generation-viii', region: 'galar' },
  ],
  indeedee: [
    { id: 876, endpoint: 'indeedee-male', generation: 'generation-viii', region: 'galar' },
    { id: 10185, endpoint: 'indeedee-female', generation: 'generation-viii', region: 'galar' },
  ],
  morpeko: [
    { id: 877, endpoint: 'morpeko-full-belly', generation: 'generation-viii', region: 'galar' },
    { id: 10186, endpoint: 'morpeko-hangry', generation: 'generation-viii', region: 'galar' },
  ],
  urshifu: [
    { id: 892, endpoint: 'urshifu-single-strike', generation: 'generation-viii', region: 'galar' },
    { id: 10191, endpoint: 'urshifu-rapid-strike', generation: 'generation-viii', region: 'galar' },
  ],
  basculegion: [
    { id: 902, endpoint: 'basculegion-male', generation: 'generation-viii', region: 'hisui' },
    { id: 10248, endpoint: 'basculegion-female', generation: 'generation-viii', region: 'hisui' },
  ],
  enamorus: [
    { id: 905, endpoint: 'enamorus-incarnate', generation: 'generation-viii', region: 'hisui' },
    { id: 10249, endpoint: 'enamorus-therian', generation: 'generation-viii', region: 'hisui' },
  ],

  // Gen 9 Base
  oinkologne: [
    { id: 916, endpoint: 'oinkologne-male', generation: 'generation-ix', region: 'paldea' },
    { id: 10252, endpoint: 'oinkologne-female', generation: 'generation-ix', region: 'paldea' },
  ],
  maushold: [
    { id: 925, endpoint: 'maushold-family-of-four', generation: 'generation-ix', region: 'paldea' },
    {
      id: 10257,
      endpoint: 'maushold-family-of-three',
      generation: 'generation-ix',
      region: 'paldea',
    },
  ],
  squawkabilly: [
    {
      id: 931,
      endpoint: 'squawkabilly-green-plumage',
      generation: 'generation-ix',
      region: 'paldea',
    },
    {
      id: 10260,
      endpoint: 'squawkabilly-blue-plumage',
      generation: 'generation-ix',
      region: 'paldea',
    },
    {
      id: 10261,
      endpoint: 'squawkabilly-yellow-plumage',
      generation: 'generation-ix',
      region: 'paldea',
    },
    {
      id: 10262,
      endpoint: 'squawkabilly-white-plumage',
      generation: 'generation-ix',
      region: 'paldea',
    },
  ],
  palafin: [
    { id: 964, endpoint: 'palafin-zero', generation: 'generation-ix', region: 'paldea' },
    { id: 10256, endpoint: 'palafin-hero', generation: 'generation-ix', region: 'paldea' },
  ],
  tatsugiri: [
    { id: 978, endpoint: 'tatsugiri-curly', generation: 'generation-ix', region: 'paldea' },
    { id: 10267, endpoint: 'tatsugiri-drooping', generation: 'generation-ix', region: 'paldea' },
    { id: 10268, endpoint: 'tatsugiri-stretchy', generation: 'generation-ix', region: 'paldea' },
  ],
  dudunsparce: [
    { id: 982, endpoint: 'dudunsparce-two-segment', generation: 'generation-ix', region: 'paldea' },
    {
      id: 10271,
      endpoint: 'dudunsparce-three-segment',
      generation: 'generation-ix',
      region: 'paldea',
    },
  ],
};

export const hisuiPokemon = [
  'growlithe-hisui',
  'arcanine-hisui',
  'voltorb-hisui',
  'electrode-hisui',
  'typhlosion-hisui',
  'samurott-hisui',
  'decidueye-hisui',
  'qwilfish-hisui',
  'sneasel-hisui',
  'lilligant-hisui',
  'zorua-hisui',
  'zoroark-hisui',
  'braviary-hisui',
  'sliggoo-hisui',
  'goodra-hisui',
  'avalugg-hisui',
];
