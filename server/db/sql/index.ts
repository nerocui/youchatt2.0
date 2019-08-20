import {QueryFile, IQueryFileOptions} from 'pg-promise';
import * as path from 'path';

const users = {
    create: sql('users/create.sql'),
	empty: sql('users/empty.sql'),
	init: sql('users/init.sql'),
    drop: sql('users/drop.sql'),
    add: sql('users/add.sql')
};

const friends = {
    create: sql('friends/create.sql'),
	empty: sql('friends/empty.sql'),
	remove: sql('friends/remove.sql'),
    drop: sql('friends/drop.sql'),
    add: sql('friends/add.sql')
};

const moments = {
    create: sql('moments/create.sql'),
	empty: sql('moments/empty.sql'),
	remove: sql('moments/remove.sql'),
    drop: sql('moments/drop.sql'),
    add: sql('moments/add.sql')
};

const requests = {
    create: sql('requests/create.sql'),
	empty: sql('requests/empty.sql'),
	remove: sql('requests/remove.sql'),
    drop: sql('requests/drop.sql'),
    add: sql('requests/add.sql')
};

const likes = {
    create: sql('likes/create.sql'),
	empty: sql('likes/empty.sql'),
	remove: sql('likes/remove.sql'),
    drop: sql('likes/drop.sql'),
    add: sql('likes/add.sql')
};

const images = {
    create: sql('images/create.sql'),
	empty: sql('images/empty.sql'),
	remove: sql('images/remove.sql'),
    drop: sql('images/drop.sql'),
    add: sql('images/add.sql')
};

const comments = {
    create: sql('comments/create.sql'),
	empty: sql('comments/empty.sql'),
	remove: sql('comments/remove.sql'),
    drop: sql('comments/drop.sql'),
    add: sql('comments/add.sql')
};

const messages = {
    create: sql('messages/create.sql'),
	empty: sql('messages/empty.sql'),
	remove: sql('messages/remove.sql'),
    drop: sql('messages/drop.sql'),
    add: sql('messages/add.sql')
};



function sql(file: string): QueryFile {
    const fullPath: string = path.join(__dirname, file);
    const options: IQueryFileOptions = {
        minify: true
    };
    const qf: QueryFile = new QueryFile(fullPath, options);
    if (qf.error) {
        console.error(qf.error);
    }
    return qf;
}

export {
    users,
    friends,
    moments,
    requests,
    likes,
    images,
    comments,
    messages,
};
