describe('trigger method', () => {
    it.only('', () => {
        cy.viewport(1920, 1080)
        cy.visit('https://demoqa.com/dragabble')
        cy.get('#dragBox')
        .trigger('mousedown', {which:1, pageX:0, pageY:0})
        .trigger('mousemove', {which:1, pageX:20, pageY:146})
        .trigger('mouseup')
        cy.get('#dragBox').should($el => {
            const coord = $el.position()
            console.log(coord)
            expect(coord.top).to.greaterThan(145)
            expect(coord.left).to.greaterThan(19)
        })
    });
   
    it('', () => {
        cy.viewport(1920, 1080)
        cy.visit('https://demoqa.com/droppable')
        cy.get('#droppable').should('contain.text', 'Drop here')
        cy.get('#draggable')
        .trigger('mousedown', {which:1, pageX:0, pageY:0})
        .trigger('mousemove', {which:1, pageX:350, pageY:54 })
        .trigger('mouseup')
        cy.get('#droppable').should('contain.text', 'Dropped!')
    });

    it('', () => {
        cy.viewport(1920, 1080)
        cy.visit('https://demoqa.com/resizable')
        cy.get('#resizableBoxWithRestriction').invoke('width', 300).invoke('height', 250)
        cy.get('#resizableBoxWithRestriction').should($el => {
            const coord = parseFloat($el[0].style.width)
            const coordi = parseFloat($el[0].style.height)
            expect(coord).to.be.closeTo(300, 2)
            expect(coordi).to.be.closeTo(250, 2)

            //console.log("width is " + coord + "," + "height is " + coordi)
        })
    });

});