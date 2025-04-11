describe('Post Courses', () => {
     
    it('should intercept and change POST data', () => {
        cy.login('ara', 'apa')

        cy.visit('http://localhost:4200/create-course')

        cy.intercept('POST', '/courses', (req) => {
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

        cy.get('#input-course-name').type('Python')
        cy.get('#textarea-description').type('Learn Python')
        cy.get('#select-location').select('Antwerpen')
        cy.get('#input-teacher').type('Mrs C')
        cy.get('#input-date').type('2026-01-01')
        cy.get('#input-time-start').type('13:00')
        cy.get('#input-time-end').type('15:00')

        cy.get('form').submit()

        cy.get('#button-approve').click()

        cy.wait('@intercept')
    })


})