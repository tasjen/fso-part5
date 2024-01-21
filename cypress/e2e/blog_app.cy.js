describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "test_name",
      username: "test_username",
      password: "test_password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", () => {
    cy.get("input#username").should("be.visible");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("input#username").type("test_username");
      cy.get("input#password").type("test_password");
      cy.contains("login").click();
      cy.contains("test_name logged in");
    });

    it("fails with wrong credentials", () => {
      cy.get("input#username").type("test_username");
      cy.get("input#password").type("wrong");
      cy.contains("login").click();
      cy.get('.error').should('be.visible');
      cy.contains("login");
    });
  });
});
