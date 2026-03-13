class User {
    constructor(name, age, tel = '') {
        this.name = name;
        this.age = age;
        this.tel = tel;
    }

    _tel = '';

    get tel() { return this._tel; }

    set tel(n_tel) {
        if (n_tel === null || n_tel.trim() === '') {
            this._tel = '';
            return;
        }
        const tel_re = /^\+7\d{10}$/;
        if (tel_re.test(n_tel)) this._tel = n_tel;
        else alert('Телефон должен быть в формате +7xxxxxxxxxx');
        return;
    }

    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}


function user_demo() {
    let name = prompt('Введите имя:');
    let age = prompt('Введите возраст:');
    let tel = prompt('Введите телефон (или пропустите):');
    if (name === null || name.trim() === '' || age === null || age.trim() === '' || isNaN(Number(age)) || !isNaN(Number(age)) && Number(age) < 0) {
        alert('Некорректные данные для создания пользователя!');
        return;
    }
    let user = new User(name, age, tel);
    console.log('Создан объект User (class):');
    user.hello();
    console.log('Телефон:', user.tel);
    alert('Пользователь создан.');
}


function User_2(name, age) {
    this.name = name;
    this.age = age;
}

User_2.prototype.hello = function() {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
};


function user_demo_2() {
    let name = prompt('Введите имя:');
    let age = prompt('Введите возраст:');
    if (name === null || name.trim() === '' || age === null || age.trim() === '' || isNaN(Number(age)) || !isNaN(Number(age)) && Number(age) < 0) {
        alert('Некорректные данные для создания пользователя!');
        return;
    }
    let user = new User_2(name, age);
    console.log('Создан прототип User_2 с использованием функции:');
    user.hello();
    alert('Пользователь создан.');
}


while (true) {
    let choice = prompt(`
        Выберите действие:
        1: взаимодействовать с классом User;
        2: взаимодействовать с прототипом User;
        0: завершить работу.
        `);
    if (choice === null) break;
    choice = choice.trim();
    if (choice === '') continue;
    if (choice === '0') break;

    const funcs = { 1: user_demo, 2: user_demo_2 };
    if (funcs[choice]) funcs[choice]();
    else alert("Некорректный выбор!");
}