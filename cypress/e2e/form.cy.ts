/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("/");
  cy.clearLocalStorage();
});

describe("Form", () => {
  it("short url", () => {
    cy.get('[data-test-id="long-url-input"]')
      .should("be.visible")
      .type("https://www.tier.app");
    cy.get('[data-test-id="shorten-it-button"]').click();
    cy.contains("Links");
  });
  it("short url with alias", () => {
    cy.get('[data-test-id="long-url-input"]')
      .should("be.visible")
      .type("https://www.tier.app");
    cy.get('[data-test-id="alias-input"]').should("be.visible").type("tier");
    cy.get('[data-test-id="shorten-it-button"]').click();
    cy.contains("Not available");
  });
  it("failed validation", () => {
    cy.get('[data-test-id="shorten-it-button"]').click();
    cy.contains("URL is required");
    cy.get('[data-test-id="long-url-input"]')
      .should("be.visible")
      .type("broken");
    cy.get('[data-test-id="shorten-it-button"]').click();
    cy.contains("URL needs to be valid");
  });
});
