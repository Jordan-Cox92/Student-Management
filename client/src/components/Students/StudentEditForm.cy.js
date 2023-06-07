import React from 'react'
import { StudentEditForm } from './StudentEditForm'

describe('<StudentEditForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<StudentEditForm />)

  })
})