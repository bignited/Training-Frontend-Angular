import FormPage from "../../PageObject/FormPage";
import SummaryPage from "../../PageObject/SummaryPage";

describe('Post Courses', () => {

    const formPage = new FormPage();
    const summaryPage = new SummaryPage();

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
        cy.fixture('users').then((users) => {
            cy.login(users.ara)
        })

        cy.visit(Cypress.env('SITE_URL') + '/create-course');

        cy.intercept('POST', '/courses', (req) => {
            req.reply({
                statusCode: 200,
                body: testCourse
            })
        }).as("intercept")
        
        formPage.elements.courseNameInput().type('Python')
        formPage.elements.descriptionInput().type('Learn Python')
        formPage.elements.locationInput().select('Antwerpen')
        formPage.elements.teacherInput().type('Learn Python')
        formPage.elements.dateInput().type('2026-01-01')
        formPage.elements.startTimeInput().type('13:00')
        formPage.elements.endTimeInput().type('15:00')
        formPage.elements.submitButton().click()

        summaryPage.elements.approveButton().click() 

        cy.wait('@intercept')
    })


})