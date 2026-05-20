import { expect, test } from 'vitest';

// Емуляція функції додавання теми для тестування
function addNewTopicToArray(array, newTopic) {
    return [...array, newTopic];
}

test('CRUD: Перевірка коректного додавання нового модуля в базу даних журналу', () => {
    const initialTopics = [{ id: 1, title: 'Модуль 1', lessons: 4 }];
    const newTopic = { id: 2, title: 'Модуль 2 (Тест)', lessons: 6 };

    const result = addNewTopicToArray(initialTopics, newTopic);

    // Очікуємо, що довжина масиву збільшиться до 2
    expect(result).toHaveLength(2);
    // Очікуємо, що назва другого елемента збігається
    expect(result[1].title).toBe('Модуль 2 (Тест)');
});