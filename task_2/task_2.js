class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}


function user_demo() {
    let name = prompt('Введите имя:');
    let age = prompt('Введите возраст:');
    if (name === null || name.trim() === '' || age === null || age.trim() === '' || isNaN(Number(age)) || !isNaN(Number(age)) && Number(age) < 0) {
        alert('Некорректные данные для создания пользователя!');
        return;
    }
    let user = new User(name, age);
    console.log('Создан объект User:');
    user.hello();
    alert('Пользователь создан.');
}


while (true) {
    let choice = prompt(`
        Выберите действие:
        1: взаимодействовать с классом User;
        0: завершить работу.
        `);
    if (choice === null) break;
    choice = choice.trim();
    if (choice === '') continue;
    if (choice === '0') break;

    if (choice === '1') user_demo();
    else alert('Некорректный выбор!');
}