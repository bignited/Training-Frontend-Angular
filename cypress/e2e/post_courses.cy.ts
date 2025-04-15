import { formPage } from "../PageObject/FormPage";
import { summaryPage } from "../PageObject/SummaryPage";

describe('Post Courses', () => {

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

    it('should intercept and change POST data', () => {
        cy.fixture("users.json").then((users) => {
            const user1 = users.user1;
            cy.login(user1.username, user1.password);

            cy.visit('/' + '/create-course');

            cy.intercept('POST', '/courses', (req) => {
                req.reply({
                    statusCode: 200,
                    body: testCourse
                })
            }).as("intercept")

            cy.get(formPage.courseName).type('Python');
            cy.get(formPage.description).type('Learn Python');
            cy.get(formPage.location).select('Antwerpen');
            cy.get(formPage.teacher).type('Learn Python');
            cy.get(formPage.date).type('2026-01-01');
            cy.get(formPage.startTime).type('13:00');
            cy.get(formPage.endTime).type('15:00');
            cy.get(formPage.submit).click();

            cy.get(summaryPage.approveBtn).click()

            cy.wait('@intercept')
        })


    })
})