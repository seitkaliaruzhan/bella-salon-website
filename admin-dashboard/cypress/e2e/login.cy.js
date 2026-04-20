describe('Login Flow - Bella Admin', () => {
  
  beforeEach(() => {
    // 1. Заходим на страницу логина перед каждым тестом
    cy.visit('http://localhost:5173/login');
  });

  it('должен успешно войти и перенаправить на страницу сотрудников', () => {
    // Используем твои data-cy из кода
    cy.get('[data-cy=email]').type('alice@example.com');
    cy.get('[data-cy=password]').type('secret123');
    cy.get('[data-cy=submit]').click();

    // ПРОВЕРКА: URL должен измениться, а заголовок стать видимым
    cy.url().should('include', '/employees');
    cy.contains('Employees').should('be.visible');
  });

  it('должен показать ошибку при неправильных данных', () => {
    // Вводим случайные данные для проверки валидации
    cy.get('[data-cy=email]').type('wrong@user.kz');
    cy.get('[data-cy=password]').type('12345');
    cy.get('[data-cy=submit]').click();

    // ПРОВЕРКА: должно появиться сообщение об ошибке
    cy.get('[data-cy=email-error]')
      .should('be.visible')
      .and('contain', 'Invalid email or password');
  });

  it('должен блокировать вход с пустыми полями', () => {
    // Просто жмем войти, ничего не вводя
    cy.get('[data-cy=submit]').click();

    // Проверяем, что мы всё еще на странице логина
    cy.url().should('include', '/login');
  });
});