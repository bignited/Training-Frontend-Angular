import { formPage } from "../PageObject/FormPage";
import { summaryPage } from "../PageObject/SummaryPage";
import { overviewPage } from "../PageObject/OverviewPage";

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

            cy.get(overviewPage.button.createCourseButton).click();

            cy.intercept('POST', '/courses', (req) => {
                req.reply({
                    statusCode: 200,
                    body: testCourse
                })
            }).as("intercept")

            cy.get(formPage.input.courseName).type('Python');
            cy.get(formPage.input.description).type('Learn Python');
            cy.get(formPage.input.location).select('Antwerpen');
            cy.get(formPage.input.teacher).type('Learn Python');
            cy.get(formPage.input.date).type('2026-01-01');
            cy.get(formPage.input.startTime).type('13:00');
            cy.get(formPage.input.endTime).type('15:00');
            cy.get(formPage.button.submit).click();

            cy.get(summaryPage.button.approveBtn).click()

            cy.wait('@intercept')
        })


    })
})