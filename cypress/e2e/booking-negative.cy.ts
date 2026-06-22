describe('Restful Booker API - Negative & Edge Case Tests', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com'

    it('should return 404 for non-existent booking ID', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking/999999`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })

    it('should reject DELETE without auth token', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/booking/1`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403)
        })
    })

    it('should reject PUT without auth token', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/booking/1`,
            failOnStatusCode: false,
            headers: { 'Content-Type': 'application/json' },
            body: {
                firstname: 'Hacker',
                lastname: 'Test',
                totalprice: 0,
                depositpaid: false,
                bookingdates: { checkin: '2025-01-01', checkout: '2025-01-02' },
                additionalneeds: ''
            }
        }).then((response) => {
            expect(response.status).to.eq(403)
        })
    })

    it('should reject booking creation with missing required fields', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/booking`,
            failOnStatusCode: false,
            headers: { 'Content-Type': 'application/json' },
            body: { firstname: 'Incomplete' }
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 500])
        })
    })

    it('should return 405 for unsupported method on auth endpoint', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/auth`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([404, 405])
        })
    })

    it('should handle invalid token on DELETE gracefully', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/booking/1`,
            failOnStatusCode: false,
            headers: { 'Cookie': 'token=invalidtoken123' }
        }).then((response) => {
            expect(response.status).to.eq(403)
        })
    })
})