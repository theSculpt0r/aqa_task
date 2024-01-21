class SignUp {
	visitSignUpPage() {
		cy.visit('/signup');
	}

	getSignUpEmailInput() {
		return cy.getByCy('signup-email');
	}

	getSignUpPasswordInput() {
		return cy.getByCy('signup-password');
	}

	getSignUpSubmitButton() {
		return cy.getByCy('signup-submit');
	}

	interceptSignUpReq() {
		return cy.intercept({
			method: 'POST',
			url: '/api/signup'
		})
			.as('SignUp');
	}

	waitForSignUpReq(email) {
		cy.wait('@SignUp').then(({response: {body}}) => {
			expect(body.user.email).eq(email);
			expect(body.user.id).to.not.null;
			expect(body.user.welcomeEmail).eq(false);
		})
	}

	/** API methods */

	// signUpViaAPI(user) {
	// 	cy.request({
	// 		method: 'POST',
	// 		url: '/api/signup',
	// 		body: {
	// 			email: user.email,
	// 			password: user.password,
	// 			welcomeEmail: false,
	// 		}
	// 	}).then((response) => {
	// 		expect(response.status).to.eq(201);
	// 		localStorage.setItem('auth_token', response.body.accessToken);
	// 		localStorage.setItem('cookie', `auth_token=${response.body.accessToken}`)
	// 	});
	// }
}
export const signUp = new SignUp();
