export class ItemAlreadyExistsError extends Error {
	constructor() {
		super("Item já cadastrado. 🤦‍♂️");
	}
}
