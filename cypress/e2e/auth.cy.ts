describe('Restful Booker API - Auth Tests', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com'

    it('should return token with valid credentials', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/auth`,
            body: { username: 'admin', password: 'password123' },
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
            expect(response.body.token).to.not.be.empty
        })
    })

    it('should return bad credentials with invalid username', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/auth`,
            body: { username: 'wronguser', password: 'password123' },
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.reason).to.eq('Bad credentials')
        })
    })

    it('should return bad credentials with invalid password', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/auth`,
            body: { username: 'admin', password: 'wrongpassword' },
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.reason).to.eq('Bad credentials')
        })
    })

    it('should return bad credentials with empty body', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/auth`,
            body: {},
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.reason).to.eq('Bad credentials')
        })
    })
})