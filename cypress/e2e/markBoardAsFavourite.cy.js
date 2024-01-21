import {boardList} from "../pages/BoardListPage";
import {boardPage} from "../pages/BoardPage";

const favouriteBoard = 'favouriteBoard'

describe('mark board as favourite', () => {
	beforeEach(() => {
		boardList.visitBoardList();
		boardList.createBoard(favouriteBoard);
	});

	it('should mark board as favourite',() => {
		boardPage.visitBoard(Cypress.env('favouriteBoard')[0].id);
		boardPage.getStarButton().should('be.visible').should('have.class', boardPage.notStarredClass);

		boardPage.getStarButton().click().should('have.class', boardPage.starredClass);
	});

	after(() => {
		boardList.deleteBoard(Cypress.env('favouriteBoard')[0].id);
	});
});
