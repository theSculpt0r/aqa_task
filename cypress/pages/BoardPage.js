class BoardPage {

	notStarredClass = 'inline-grid relative self-center ml-2 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer stroke-current text-white';
	starredClass = 'inline-grid relative self-center ml-2 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer fill-current text-yellow-300';

	visitBoard(boardId) {
		cy.visit(`/board/${boardId}`);
	}

	getStarButton() {
		return cy.getByCy('star');
	}

	getCreateListButton() {
		return cy.getByCy('create-list');
	}

	getAddListInput() {
		return cy.getByCy('add-list-input');
	}

	getAddListButton() {
		return cy.get('.grid > div > .py-1');
	}

	getListPlaceHolder() {
		return cy.getByCy('list-placeholder');
	}

	getListName() {
		return cy.getByCy('list-name');
	}

	getNotification() {
		return cy.getByCy('notification-message')
	}

	getListOptions() {
		return cy.getByCy('list-options');
	}



	interceptCreateList() {
		return cy.intercept({
			method: 'POST',
			url: '/api/lists'
		})
			.as('CreateLists');
	}

	waitCreateBoard(list) {
		cy.wait('@CreateBoard').then(({response: {body}}) => {
			expect(body.boardId).to.not.null;
			expect(body.created).to.not.null;
			expect(body.id).to.not.null;
			expect(body.order).to.not.null;
			expect(body.name).eq(list.name);
			// Cypress.env(`${list.name}`).push(body);
		});
	}

	/** API methods */

	createList({name, boardId, order}) {
		cy.request({
			method: 'POST',
			url: `api/lists`,
			body: {
				name,
				boardId,
				order,
			}
		}).then((response) => {
			expect(response.status).to.eq(201);
			Cypress.env(`${name}`).push(response.body);
		});
	}
}

export const boardPage = new BoardPage();
