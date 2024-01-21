class BoardListPage {
	visitBoardList() {
		cy.visit('/')
	}

	getBoardList() {
		return cy.getByCy('board-list');
	}

	getFirstBoardInput() {
		return cy.getByCy('first-board');
	}

	getBoardItem() {
		return cy.getByCy('board-item');
	}

	getBoardDetail() {
		return cy.getByCy('board-detail');
	}

	getCreateBoardButton() {
		return cy.getByCy('create-board');
	}

	getNewBoardInput() {
		return cy.getByCy('new-board-input');
	}

	getNewBoardCreateButton() {
		return cy.getByCy('new-board-create');
	}

	interceptCreateBoard() {
		return cy.intercept({
			method: 'POST',
			url: '/api/boards'
		})
			.as('CreateBoard');
	}

	waitCreateBoard(board) {
		cy.wait('@CreateBoard').then(({response: {body}}) => {
			expect(body.created).to.not.null;
			expect(body.id).to.not.null;
			expect(body.name).eq(board.name);
			expect(body.starred).eq(board.starred);
			Cypress.env(`${board.name}`).push(body);
		});
	}

	/** API methods */
	createBoard(boardName){
		cy.request({
			method: 'POST',
			url: `api/boards`,
			body: {
				name: boardName
			}
		}).then((response) => {
			expect(response.status).to.eq(201);
			Cypress.env(`${boardName}`).push(response.body);
		});
	}

	deleteBoard(boardId) {
		cy.request({
			method: 'DELETE',
			url: `api/boards/${boardId}`,
			body: {}
		}).then((response) => {
			expect(response.status).to.eq(200);
		});
	}
}

export const boardList = new BoardListPage();
