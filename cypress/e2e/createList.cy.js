import {boardList} from "../pages/BoardListPage";
import {boardPage} from "../pages/BoardPage";

const boardForList = 'boardForList';
const listName = 'listName';

describe('create list',() => {
	beforeEach(() => {
		boardList.visitBoardList();
		boardList.createBoard(boardForList);
	});

	it('should create list', () => {
		boardPage.visitBoard(Cypress.env('boardForList')[0].id);

		boardPage.getAddListInput().should('be.visible').type(listName);
		boardPage.getAddListButton().should('be.visible').click();
		boardPage.getListPlaceHolder().should('be.visible');
	});

	after(() => {
		boardList.deleteBoard(Cypress.env('boardForList')[0].id);
	});
});