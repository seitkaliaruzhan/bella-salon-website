describe('Bella Salon - E2E Test', () => {
  it('должен проверить работу интерфейса', () => {
    cy.visit('http://localhost:5173/employees'); 
    cy.wait(1000);

    it('должен успешно переключаться на страницу продуктов', () => {
    cy.visit('http://localhost:5173/employees');
    
    // Находим ссылку или кнопку "Products" в меню и кликаем
    cy.get('nav, aside').contains('Products').click();

    // Проверяем, что URL изменился или появился заголовок страницы продуктов
    cy.url().should('include', '/products');
  });

    // 1. Просто вводим текст (имитируем активность)
    cy.get('input').first().type('Testing...', { force: true });

    // 2. Нажимаем кнопку
    cy.get('button').contains('Add').click();

    cy.contains('Aruna Bekova').should('be.visible');
  });
});