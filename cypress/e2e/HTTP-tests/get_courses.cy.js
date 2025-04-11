describe('Change GET Courses', () => {
     
    it('should intercept and change GET data', () => {
        cy.login('ara', 'apa')

        cy.intercept('GET', '/courses', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    name: 'Playwright',
                    description: 'Learn playwright',
                    location: 'Brugge',
                    teacher: 'Mr B',
                    image: null,  
                    date: '01-01-2026',
                    timeStart: '13:00',
                    timeEnd: '15:00' 
                } 
            })
        }).as("intercept")

        cy.visit('http://localhost:4200/overview')

        cy.wait('@intercept')
    })

})
