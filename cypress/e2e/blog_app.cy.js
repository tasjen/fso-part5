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
      cy.get(".error").should("be.visible");
      cy.contains("login");
    });
  });

  describe("When logged in", () => {
    beforeEach(() => {
      cy.login({ username: "test_username", password: "test_password" });
    });

    it("A blog can be created", () => {
      cy.contains("create new blog").click();
      cy.get("input#title").type("test_title");
      cy.get("input#author").type("test_author");
      cy.get("input#url").type("test_url");
      cy.get('button[type="submit"]').click();
      cy.get("html").should("contain", "test_title test_author");
      cy.get(".message").should("be.visible");
    });

    describe("and when there is a blog", () => {
      beforeEach(() => {
        cy.addBlog({
          title: "test_title",
          author: "test_author",
          url: "test_url",
        });
      });
      it("User can like a blog", () => {
        cy.contains("view").click();
        cy.get(".like-button").click();
        cy.get(".like-count").should("have.text", "likes 1");
      });
    });
  });
});
