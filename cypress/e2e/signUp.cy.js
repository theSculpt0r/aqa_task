import {signUp} from "../pages/SignUp";
import {boardList} from "../pages/BoardListPage";

let uniqId;
let email;

describe('Sign up', () => {
	beforeEach(() => {
		uniqId = Date.now();
		email = `any+${uniqId}@email.tld`;
		signUp.interceptSignUpReq();
	});

	it('Should complete sign up flow', () => {
		signUp.visitSignUpPage();
		signUp.getSignUpEmailInput().should('be.visible').type(email);
		signUp.getSignUpPasswordInput().should('be.visible').type(Cypress.env('password'));
		signUp.getSignUpSubmitButton().should('be.visible').click();

		signUp.waitForSignUpReq(email);
		boardList.getBoardList().should('be.visible');
	});
});
