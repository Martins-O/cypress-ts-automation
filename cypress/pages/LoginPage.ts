class LoginPage {
    private usernameInput = '#username'
    private passwordInput = '#password'
    private loginButton = '#login'
    private errorMessage = '#flash'

    visit() {
        cy.visit('/index.html')
    }

    enterUsername(username: string) {
        cy.get(this.usernameInput).clear().type(username)
    }

    enterPassword(password: string) {
        cy.get(this.passwordInput).clear().type(password)
    }

    clickLogin() {
        cy.get(this.loginButton).click()
    }

    login(username: string, password: string) {
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLogin()
    }

    getErrorMessage() {
        return cy.get(this.errorMessage)
    }
}

export default new LoginPage()