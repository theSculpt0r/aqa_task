import {boardList} from "../pages/BoardListPage";
import {boardPage} from "../pages/BoardPage";

const boardForUpdatedList = 'boardForUpdatedList';
const startedListName = 'listForUpdating';
const updatedListName = 'updatedListName';

describe('create list', () => {
	beforeEach(() => {
		cy.wrap(null)
			.then(() => {
				boardList.visitBoardList();
			})
			.then(() => {
				boardList.createBoard(boardForUpdatedList);
			})
			.then(() => {
				boardPage.createList({
					name: startedListName,
					boardId: Cypress.env('boardForUpdatedList')[0].id,
					order: 0
				});
			});
	});

	it('should update list', () => {
		boardPage.visitBoard(Cypress.env('boardForUpdatedList')[0].id);

		boardPage.getListPlaceHolder().should('be.visible');
		boardPage.getListName().should('be.visible').type(updatedListName).type('{enter}');
		boardPage.getNotification().should('be.visible');
	});

	after(() => {
		boardList.deleteBoard(Cypress.env('boardForUpdatedList')[0].id);
	});
});