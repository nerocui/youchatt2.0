import SearchEngine from './algolia';
import initFirebase from './firebase';
import initPassport from './passport';
import { db } from '../db';

export let searchEngine: SearchEngine = new SearchEngine();

export default function initService() {
	initFirebase();
	searchEngine.init();
	initPassport(searchEngine, db);
}
