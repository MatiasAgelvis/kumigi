type ID = number | string;

interface IdObject extends Object {
	id: ID;
}

export function indexOfId(list: IdObject[], id: ID) {
	return list.map((item) => item.id).indexOf(id);
}
