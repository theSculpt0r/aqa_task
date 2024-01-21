import {signUp} from "../pages/SignUp";
import {boardList} from "../pages/BoardListPage";

let firstBoardName = 'firstBoard';
let secondBoardName = 'secondBoard';

describe('create new board', () => {

	beforeEach(() => {
		boardList.interceptCreateBoard();
	})

	after(() => {
		boardList.deleteBoard(Cypress.env('firstBoard')[0].id);
		boardList.deleteBoard(Cypress.env('secondBoard')[0].id);
	});

	it('should create first board', () => {
		boardList.visitBoardList();
		boardList.getBoardList().should('be.visible');
		boardList.getFirstBoardInput().should('be.visible').type(firstBoardName).type('{enter}');

		boardList.waitCreateBoard({name: firstBoardName, starred: false})
		boardList.getBoardDetail().should('be.visible');
	});

	it('should create second board', () => {
		boardList.visitBoardList();
		boardList.getBoardList().should('be.visible');

		boardList.getCreateBoardButton().should('be.visible').click();
		boardList.getNewBoardInput().should('be.visible').type(secondBoardName);
		boardList.getNewBoardCreateButton().should('be.visible').click();

		boardList.waitCreateBoard({name: secondBoardName, starred: false})
		boardList.getBoardDetail().should('be.visible');
	});
});
