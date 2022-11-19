import { OKey } from "app/types/avatara";

interface IdObject {
	id: OKey;
	[key: OKey]: any;
}

export function indexOfId(list: IdObject[], id: OKey): number {
	return list.map((item) => item.id).indexOf(id);
}
