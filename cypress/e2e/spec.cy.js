describe('Proje testlerim', () => {
  it('Başarılı giriş', () => {
    cy.visit('http://localhost:5173/login');

    cy.get(`[data-cy="email"]`).type("user@example.com");
    cy.get(`[data-cy="password"]`).type("Test@123456");
    cy.get(`[data-cy="terms"]`).check();

    cy.get(`[data-cy="submit"]`).should("not.be.disabled").click();


    cy.get(`[data-cy="success"]`, { timeout: 10000 }).should("contain.text", "Giriş Başarılı!");
  });



  it("Hatalı giriş, email geçersiz", () => {
    cy.visit('http://localhost:5173/login');

    cy.get("[data-cy=submit]").should("be.disabled");

    cy.get("[data-cy=email]").type("userexample.com");
    cy.get(`[data-cy="password"]`).type("Test@123456");
    cy.get(`[data-cy="terms"]`).check();
    cy.get("[data-cy=submit]").should("be.disabled");

  });

  it("Hatalı giriş, email ve password geçersiz", () => {
    cy.visit('http://localhost:5173/login');

    cy.get("[data-cy=submit]").should("be.disabled");

    cy.get("[data-cy=email]").type("userexample.com");
    cy.get("[data-cy=password]").type("weakpasswordd")
    cy.get(`[data-cy="terms"]`).check();
    cy.get("[data-cy=submit]").should("be.disabled");


  });

  it("Hatalı giriş, email,password geçerli terms işaretli değil", () => {
    cy.visit('http://localhost:5173/login');

    cy.get("[data-cy=submit]").should("be.disabled");

    cy.get(`[data-cy="email"]`).type("user@example.com");
    cy.get(`[data-cy="password"]`).type("Test@123456");
    cy.get(`[data-cy="terms"]`).uncheck();
    cy.get("[data-cy=submit]").should("be.disabled");

  });
});