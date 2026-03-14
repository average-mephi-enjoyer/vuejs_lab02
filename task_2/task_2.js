class User {
    #age;
    _tel = '';

    constructor(name, age, tel = '') {
        this.name = name;
        this.age = age;
        this.tel = tel;
    }

    get age() { return this.#age; }

    get tel() { if (this._tel) return this._tel; else return 'не указан'; }

    set age(value) {
        const num = Number(value);
        if (Number.isInteger(num) && num >= 1 && num <= 100) this.#age = num;
        else throw new Error('Возраст должен быть целым числом от 1 до 100');
        return this.#age;
    }

    set tel(n_tel) {
        if (n_tel === null || n_tel.trim() === '') {
            this._tel = '';
            return;
        }
        const tel_re = /^\+7\d{10}$/;
        if (tel_re.test(n_tel)) this._tel = n_tel;
        else throw new Error('Телефон должен быть в формате +7xxxxxxxxxx');
        return this._tel;
    }

    hello() { console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`); }
}



function User_2(name, age) {
    this.name = name;
    this.age = age;
}

User_2.prototype.hello = function() {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
};



class Student extends User {
    #knowledge = 0;
    constructor(name, age, tel = '') {
        super(name, age, tel);
    }

    get knowledge() { return this.#knowledge; }

    hello() { console.log(`Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`); }

    learn() { this.#knowledge++; }
}


function user_demo() {
    try {
        let name = prompt('Введите имя:');
        let age = prompt('Введите возраст (целое число от 1 до 100):');
        let tel = prompt('Введите телефон в формате +7xxxxxxxxxx (или пропустите):');

        let user = new User(name, age, tel);

        console.log('Создан объект User:');
        user.hello();
        console.log('Телефон:', user.tel);
        alert('Пользователь создан.');
    } catch (e) { alert('Ошибка: ' + e.message); }
}


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


function student_demo() {
    try {
        let name = prompt('Введите имя студента:');
        let age = prompt('Введите возраст студента (целое число от 1 до 100):');
        let tel = prompt('Введите телефон студента (или пропустите):');
        let student = new Student(name, age, tel);
        console.log('Создан объект Student:');
        student.hello();
        console.log('Телефон:', student.tel);
        console.log('Начальные знания:', student.knowledge);

        while (true) {
            let learn_choice = prompt(`
                Выберите действие:
                1: обучить студента;
                0: завершить работу со студентом.
            `);
            if (learn_choice === null) break;
            learn_choice = learn_choice.trim();
            if (learn_choice === '') continue;
            if (learn_choice === '0') break;

            if (learn_choice === '1') {
                student.learn();
                alert('Знания после learn: ' + student.knowledge);
            }
            else alert("Некорректный выбор!");
        }
    } catch (e) { alert('Ошибка: ' + e.message); }
}


Array.prototype.reverse = function() {
    const copy = this.slice();
    this.push(...copy);
    return this;
};


function reverse_demo() {
    let input = prompt('Введите элементы массива через запятую (например: 1,2,3,4,5):');
    if (input === null) {
        alert('Отменённое действие. Попробуем снова.');
        return;
    }
    let arr = input.split(',').map(item => item.trim()).filter(item => item !== '');
    console.log('Исходный массив:', arr);
    let result = arr.reverse();
    console.log('После reverse():', result);
    console.log('Исходный массив теперь:', arr);
    alert('Результат в консоли.');
}


while (true) {
    let choice = prompt(`
        Выберите действие:
        1: взаимодействовать с классом User;
        2: взаимодействовать с прототипом User;
        3: взаимодействовать с классом Student;
        4: поработать с переопределённым методом reverse() для массивов;
        0: завершить работу.
        `);
    if (choice === null) break;
    choice = choice.trim();
    if (choice === '') continue;
    if (choice === '0') break;

    const funcs = { 1: user_demo, 2: user_demo_2, 3: student_demo, 4: reverse_demo};
    if (funcs[choice]) funcs[choice]();
    else alert("Некорректный выбор!");
}