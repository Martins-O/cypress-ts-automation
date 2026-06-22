describe('Restful Booker API - Booking Filter Tests', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com'

    it('should filter bookings by firstname', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking`,
            qs: { firstname: 'Josh' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('should filter bookings by lastname', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking`,
            qs: { lastname: 'Allen' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('should filter bookings by checkin date', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking`,
            qs: { checkin: '2024-01-01' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('should filter bookings by checkout date', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking`,
            qs: { checkout: '2024-12-31' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('should filter bookings by checkin and checkout range', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking`,
            qs: { checkin: '2024-01-01', checkout: '2024-12-31' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })
})