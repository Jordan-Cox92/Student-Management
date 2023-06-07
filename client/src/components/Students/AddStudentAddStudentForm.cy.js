import React from 'react'
import { AddStudentForm } from './AddStudent'

describe('<AddStudentForm />', () => {
  it('renders', () => {
    // see: https: on.cypress.io / mounting - react;
    cy.mount(<AddStudentForm />);
    cy.get('fieldset')
    cy.get('form').should('exist').debug();
    cy.get('#name_form');
    cy.get('#age_form');
    cy.get('#email_form');
    cy.get("h2")
      .should("contain", "Add New Student");

    cy.contains('Add New Student');


  });





});