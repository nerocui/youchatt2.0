import Profile from './Profile';
import { isIterable } from 'core-js';


it('Creates a new Profile', () => {
	const profile = new Profile('dsadasdasda', 'user1', 'first1', 'last1', 'FL', 'http://images.hellogiggles.com/uploads/2016/02/27012831/flickr-cat.jpg', true, 'dsafgrfe');
	expect(profile).not.toBeNull();
});

