/// <reference types="cypress"/>


describe('TheAceInvoiceTest', () => {

    beforeEach(() => {

        cy.log('Loads the website')
        cy.visit("https://www.aceinvoice.com/")

        cy.get('ul li a').contains("Sign up").should('be.visible').click()
        cy.url().should('include', '/sign_up')

    })

    it(('Should be able to do all the positive cases from step 1 to step 10'), () => {

        cy.getUserLogin()
        cy.get('[data-test-id=signup-password]').type('welcome1234')
        cy.get('[data-test-id=signup-continue]').click()
        cy.get('[data-test-id=introduction-first-name]').type('Oliver')
        cy.get('[data-test-id=introduction-last-name]').type('Smith')
        cy.get('.nui-react-select__dropdown-indicator').click()
        cy.contains('(GMT+05:30) New Delhi').click()
        cy.get('[data-test-id="introduction-date-format-%d/%m/%Y"]').contains('DD/MM/YYYY').click()
        cy.get('[datatestid=introduction-terms-service]').check()
        cy.get('[datatestid="introduction-marketing-email-consent"]').check()
        cy.get('[data-test-id=introduction-submit]').click()
        cy.get('.form-input input[name=name]').type('ukdgit Private Limited')
        cy.get('[data-test-id=introduction-submit]').click()

        cy.log('Add New Client page')
        cy.get('[data-test-id=client-form-skip]').click()
        cy.get('.congratulations .completed-message h4').should('have.text', "Congratulations, you're all set!")
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Organization was created successfully.`)
        })
        cy.get('[data-test-id=onboarding-continue]').click()

        cy.log('Adding New Client')
        cy.get('.ri-user-star-line').click()
        cy.get('[data-test-id=client-add-new]').click()
        cy.get('[data-test-id=client-name]').type('Trix Inc')
        cy.get('[data-test-id=client-submit]').click()

        cy.log('Adding New Project')
        cy.get('[data-test-id=project-name]').type('Trix Web Development')
        cy.get('input[id=react-select-5-input]').click({force:true})
        cy.contains('Hourly project rate').click()
        cy.get('[data-test-id=project-rate]').clear().type('20')
        cy.get('[data-test-id=project-save]').click()

        cy.log('Asserting the project details')
        cy.get('.form-group [data-test-id=project-name]').should('have.text', 'Trix Web Development')
        cy.get('[data-test-id=project-billing-method]').should('have.text', 'Hourly Project Rate')
        cy.get('.form-group .field-value span').eq(0).should('have.text', 'No rounding ')
        cy.get('[data-test-id=project-team-member-table-name-1]').should('have.text', 'Oliver Smith')
        cy.get('[data-test-id=project-hourly-rate]').should('have.text', '$20.00')

    })

    it('Should be able to do negative test cases for STEP 2', () => {

        cy.log('Should be able to do empty email step negative test case')
        cy.get('[data-test-id=signup-submit]').click()
        cy.contains("Email can't be empty").should('exist')

        cy.log('Should be able to do invalid email step negative test case')
        cy.getWrongUserLogin()
        cy.contains('Email is invalid').should('exist')
        cy.get('[data-test-id=signup-email]').clear()
        cy.get('.Toastify__close-button--error').click()
    })

    it(('Should be able to do negative test cases for STEP 3'), () => {

        cy.log('Should be able to do password blank step negative test case')
        cy.getUserLogin()
        cy.get('[data-test-id=signup-continue]').click()
        cy.contains("Password can't be blank").should('exist')
        cy.get('.Toastify__close-button--error').click()

        cy.log('Should be able to do too short password step negative test case')
        cy.get('[data-test-id=signup-password]').type('1234')
        cy.get('[data-test-id=signup-continue]').click()
        cy.contains("Password is too short").should('exist')

    })

    it(('Should be able to do negative test cases for STEP 4'), () => {

        cy.log('Should be able to do first name step negative test case')
        cy.getUserLogin()
        cy.get('[data-test-id=signup-password]').type('welcome1234')
        cy.get('[data-test-id=signup-continue]').click()
        cy.get('[data-test-id=introduction-submit]').click()
        cy.contains("Please enter first name").should('exist')

        cy.log('Should be able to do last name step negative test case')
        cy.get('[data-test-id=introduction-first-name]').type('Oliver',{force:true})
        cy.get('[data-test-id=introduction-submit]').click()
        cy.contains("Please enter last name").should('exist')

        cy.log('Should be able to do time zone step negative test case')
        cy.get('[data-test-id=introduction-last-name]').type('Smith',{force:true})
        cy.get('[data-test-id=introduction-submit]').click()
        cy.contains("Please enter time zone").should('exist')

        cy.log('Should be able to do terms and condition step negative test case')
        cy.get('.nui-react-select__dropdown-indicator').click()
        cy.contains('(GMT+05:30) New Delhi').click()
        cy.get('[data-test-id="introduction-date-format-%d/%m/%Y"]').contains('DD/MM/YYYY').click()
        cy.get('[data-test-id=introduction-submit]').click()
        cy.get('[data-test-id=introduction-terms-service-error]').should('have.text', "Please accept our terms of service and privacy policy")

    })

    it(('Should be able to do negative test cases for STEP 5'), () => {

        cy.log('Should be able to do company name step negative test case')
        cy.getUserLogin()
        cy.get('[data-test-id=signup-password]').type('welcome1234')
        cy.get('[data-test-id=signup-continue]').click()
        cy.get('[data-test-id=introduction-first-name]').type('Oliver')
        cy.get('[data-test-id=introduction-last-name]').type('Smith')
        cy.get('.nui-react-select__dropdown-indicator').click()
        cy.contains('(GMT+05:30) New Delhi').click()
        cy.get('[data-test-id="introduction-date-format-%d/%m/%Y"]').contains('DD/MM/YYYY').click()
        cy.get('[datatestid=introduction-terms-service]').check()
        cy.get('[datatestid="introduction-marketing-email-consent"]').check()
        cy.get('[data-test-id=introduction-submit]').click()
        cy.wait(3000)
        cy.get('[data-test-id=introduction-submit]').click()
        cy.contains("Company name is required").should('exist')

    })

})