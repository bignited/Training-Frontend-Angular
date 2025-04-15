describe('Change GET Courses', () => {

    const testCourse = {
        name: 'Playwright',
        description: 'Learn playwright',
        location: 'Brugge',
        teacher: 'Mr B',
        image: null,
        date: '01-01-2026',
        timeStart: '13:00',
        timeEnd: '15:00'
    }

    it('should intercept and change GET data', () => {
        cy.fixture("users.json").then((users) => {
            const user1 = users.user1;
            cy.login(user1.username, user1.password);

            cy.intercept('GET', '/courses', (req) => {
                req.reply({
                    statusCode: 200,
                    body: testCourse
                })
            }).as("intercept")

            cy.visit('/' + '/overview')

            cy.wait('@intercept')

        });
    });
})