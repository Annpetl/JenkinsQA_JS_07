import { SideMenuItems } from "../../fixtures/Project_test_data/02.04 Dashboard Command panel.json";
import { SideMenuItemLink } from "../../fixtures/Project_test_data/02.04 Dashboard Command panel.json";

const localhost = Cypress.env("local.host");
const localport = Cypress.env("local.port");

describe.skip("dashboard sidemenu items", () => {
  it("dashboard sidemenu items titles", () => {
    cy.get(".jenkins-breadcrumbs__list-item")
      .realHover()
      .get(".jenkins-breadcrumbs__list-item > a > button")
      .click({ force: true })
      .get(".jenkins-dropdown__item")
      .should("have.length", "5")
      .then(($els) => {
        const a = Cypress.$.makeArray($els).map(($els) => $els.innerText);
        console.log(a);
        expect(a).to.eql(SideMenuItems);
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

  SideMenuItems.forEach(function(linkname, index){
it.only(`check ${linkname} navigation`, function () {
      cy.wrap(this.SideMenuLink[index]).click();

      cy.url().should('contain', SideMenuItemLink[index])
    });
  });
});


