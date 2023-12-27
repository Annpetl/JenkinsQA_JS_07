import { SideMenuItemEndpoint, SideMenuItemTitle, pageHeaderName} from "../../fixtures/Project_test_data/02.04 Dashboard Command panel.json";

const localhost = Cypress.env("local.host");
const localport = Cypress.env("local.port");

describe("dashboard sidemenu items", () => {
  it("dashboard sidemenu items titles", () => {
    cy.get(".jenkins-breadcrumbs__list-item")
      .realHover()
      .get(".jenkins-breadcrumbs__list-item > a > button")
      .click({ force: true })
      .get(".jenkins-dropdown__item")
      .should("have.length", "5")
      cy.get(".jenkins-dropdown__item")
      .each(($els,index) => {
        const a = $els.text();
        expect(a).to.contain(SideMenuItemTitle[index]);
      });
  });

  it("dashboard sidemenu items icons", () => {
    cy.get(".jenkins-breadcrumbs__list-item")
      .realHover()
      .get(".jenkins-breadcrumbs__list-item > a > button")
      .click({ force: true })
      .get(".jenkins-dropdown__item > .jenkins-dropdown__item__icon")
      .should("have.length", "5");
  });
});

describe.skip("sidemenu item navigation", () => {
  beforeEach("dropdown list open", () => {
    cy.visit(`http://${localhost}:${localport}/`);
    cy.get(".jenkins-breadcrumbs__list-item")
      .realHover()
      .get("button.jenkins-menu-dropdown-chevron:nth-child(1)")
      .click({ force: true });
  });

  it("New Item navigation", () => {
    cy.get(".jenkins-dropdown__item:nth-child(1)")
      .click()
      .url()
      .should("to.eql", SideMenuItemLinks["New Item"]);
  });
  it("People item navigation", () => {
    cy.get('a[href="/asynchPeople/"]:nth-child(2)')
      .click()
      .url()
      .should("to.eql", SideMenuItemLinks["People"]);
  });

  it("Build History item navigation", () => {
    cy.get(".jenkins-dropdown__item:nth-child(3)")
      .click()
      .url()
      .should("to.eql", SideMenuItemLinks["Build History"]);
  });

  it.only("Manage Jenkins navigation", () => {
    cy.get(".jenkins-dropdown__item:nth-child(4)")
      .click()
      .url()
      .should("contain", SideMenuItemLinks["Manage Jenkins"]);
  });

  it("My Views navigation", () => {
    cy.get(".jenkins-dropdown__item:nth-child(5)")
      .click()
      .url()
      .should("to.eql", SideMenuItemLinks["My Views"]);
  });
});

describe("Verify links on the left side panel", function () {
  beforeEach(function () {
    cy.visit(`http://${localhost}:${localport}/`);
    cy.get(".jenkins-breadcrumbs__list-item")
      .realHover()
      .get("button.jenkins-menu-dropdown-chevron:nth-child(1)")
      .click({ force: true });
    cy.get("a.jenkins-dropdown__item").as("SideMenuLink");
  });

  SideMenuItemTitle.forEach(function (linkname, index) {
    it.only(`check ${linkname} navigation`, function () {
      cy.wrap(this.SideMenuLink[index]).click();
      cy.url().should("contain", SideMenuItemEndpoint[index]);
      cy.contains(pageHeaderName[index])
    });
  });

  it.only(`check sidemenu item navigation`, function () {

    cy.get(this.SideMenuLink).each(($el, index) => {
      //cy.wrap($el).should('have.text', SideMenuItemEndpoint4[index])
      expect($el).to.have.attr('href', SideMenuItemEndpoint[index])
    });
  });

  // it(`check sidemenu item navigation`, function () {
  //   cy.get('a[href="newJob"]').then(($el) => {
  //     cy.wrap($el).click();
  //   });
  // });
});
