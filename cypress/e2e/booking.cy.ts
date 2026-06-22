describe('Restful Booker API - Booking Tests', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com'
    let token: string
    let bookingId: number

    before(() => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/auth`,
            body: { username: 'admin', password: 'password123' },
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            token = response.body.token
        })
    })

    it('should get all bookings', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking`,
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.be.greaterThan(0)
        })
    })

    it('should create a new booking', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/booking`,
            headers: { 'Content-Type': 'application/json' },
            body: {
                firstname: 'Martins',
                lastname: 'Okonkwo',
                totalprice: 150,
                depositpaid: true,
                bookingdates: { checkin: '2025-01-01', checkout: '2025-01-07' },
                additionalneeds: 'Breakfast'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('bookingid')
            expect(response.body.booking.firstname).to.eq('Martins')
            bookingId = response.body.bookingid
        })
    })

    it('should get booking by id', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking/${bookingId}`,
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.firstname).to.eq('Martins')
            expect(response.body.lastname).to.eq('Okonkwo')
        })
    })

    it('should update a booking', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/booking/${bookingId}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            body: {
                firstname: 'Martins',
                lastname: 'Updated',
                totalprice: 200,
                depositpaid: false,
                bookingdates: { checkin: '2025-02-01', checkout: '2025-02-07' },
                additionalneeds: 'Lunch'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.lastname).to.eq('Updated')
            expect(response.body.totalprice).to.eq(200)
        })
    })

    it('should partially update a booking', () => {
        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/booking/${bookingId}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            body: { firstname: 'UpdatedFirst' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.firstname).to.eq('UpdatedFirst')
        })
    })

    it('should delete a booking', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/booking/${bookingId}`,
            headers: { 'Cookie': `token=${token}` }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })

    it('should return 404 for deleted booking', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/booking/${bookingId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })
})