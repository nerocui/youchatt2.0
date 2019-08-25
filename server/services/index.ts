import SearchEngine from './algolia';
import initFirebase from './firebase';

export let searchEngine: SearchEngine = new SearchEngine();

export default function initService() {
	initFirebase();
	searchEngine.init();
}
