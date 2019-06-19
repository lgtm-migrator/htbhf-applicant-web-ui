Feature: Do you live in Scotland?
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to select whether or not I live in Scotland

  Background:
    Given I have entered my details up to the do you live in Scotland page

  Scenario: Yes and No are displayed
    Then Yes and No options are displayed on the do you live in Scotland page

  Scenario: Do not select an option
    When I do not select an option
    And I click continue
    Then I am informed that I need to select an option for do you live in Scotland

  Scenario: Select the No option
    When I say No to the do you live in Scotland question
    And I click continue
    Then I am shown the enter date of birth page

  Scenario: Select the Yes option and claimant is told to use the Scottish scheme
    When I select the Yes option on the do you live in Scotland page
    And I click continue
    Then I am shown the I live in Scotland page
    And I am informed that I cannot apply and should use the Scottish scheme
