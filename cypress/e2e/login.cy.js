/**
 * - Login spec
 *   - should display login page correctly
 *   - should display error when email is empty
 *   - should display error invalid when email format is wrong
 *   - should display error when password is empty
 *   - should display toast error when username and/or password are wrong
 *   - should display register page when navigate to register page
 *   - should display homepage when username and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display login page correctly", () => {
    cy.get("span").contains("Login").should("be.visible");
    cy.get('input[placeholder="Enter your email"]').should("be.visible");
    cy.get('input[placeholder="Enter your password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
    cy.get("button")
      .contains(/^Create an account$/)
      .should("be.visible");
  });

  it("should display error when email is empty", () => {
    cy.get('input[placeholder="Enter your email"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.get("p").contains("Email is required").should("be.visible");
  });

  it("should display error invalid when email format is wrong", () => {
    cy.get('input[placeholder="Enter your email"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.get("p").contains("Email is required").should("be.visible");
    cy.get('input[placeholder="Enter your email"]').type("notemail");
    cy.get("p").contains("Must be valid email").should("be.visible");
  });

  it("should display error when password is empty", () => {
    cy.get('input[placeholder="Enter your password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.get("p").contains("Password is required").should("be.visible");
  });

  it("should display toast error when username and/or password are wrong", () => {
    cy.get('input[placeholder="Enter your email"]').should("be.visible");
    cy.get('input[placeholder="Enter your email"]').type("random@mail.co.id");
    cy.get('input[placeholder="Enter your password"]').should("be.visible");
    cy.get('input[placeholder="Enter your password"]').type("test123");
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.get("div").contains("email or password is wrong").should("be.visible");
  });

  it("should display register page when navigate to register page", () => {
    cy.get("button").contains("Create an account").should("be.visible");
    cy.get("button").contains("Create an account").click();
    cy.get("span").contains("Create an account").should("be.visible");
    cy.get("button").contains("Register").should("be.visible");
    cy.get("button").contains("Login").should("be.visible");
  });

  it("should display homepage when username and password are correct", () => {
    cy.get('input[placeholder="Enter your email"]').should("be.visible");
    cy.get('input[placeholder="Enter your email"]').type("satriya@mail.com");
    cy.get('input[placeholder="Enter your password"]').should("be.visible");
    cy.get('input[placeholder="Enter your password"]').type("password");
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.get("button").contains("Home").should("be.visible");
    cy.get("button").contains("Leaderboard").should("be.visible");
    cy.get("button").contains("Logout").should("be.visible");
  });
});
