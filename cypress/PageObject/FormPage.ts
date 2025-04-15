class FormPage{
 
    elements = {
        courseNameInput : () => cy.get('#input-course-name'),      
        descriptionInput : () => cy.get('#textarea-description'),  
        locationInput : () => cy.get('#select-location'), 
        teacherInput : () => cy.get('#input-teacher'), 
        dateInput : () => cy.get('#input-date'), 
        startTimeInput : () => cy.get('#input-time-start'),   
        endTimeInput : () => cy.get('#input-time-end'),
        submitButton : () => cy.get('#submit-form')
    }
  }
  export default FormPage;