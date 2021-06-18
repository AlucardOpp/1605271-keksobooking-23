import {generateCards} from './generateTemplates.js';
import {getRandomAd} from './random-ad.js';
const ads = new Array(1).fill(null).map(() => getRandomAd());
generateCards(ads);
