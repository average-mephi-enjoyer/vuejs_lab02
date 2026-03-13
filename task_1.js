const countries = ['Russia', 'Belarus', 'Afghanistan', 'China', 'Venezuela', 'Iran'];

function count_loads(){
    let count = localStorage.getItem('pageLoadCount');
    if (count === null) count = 0;
    else count = Number(count);
    count++;
    localStorage.setItem('pageLoadCount', count);
    alert(`Вы загрузили эту страницу ${count} раз ;-)`);
}


function load_image(url) {
    return new Promise((resolve) => {
        let img = new Image(); 
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => {
            let p = document.createElement('p');
            p.textContent = 'Can’t load image :-(';
            resolve(p);
        };
    });
}


async function append_image(url, container) {
    const element = await load_image(url);
    container.appendChild(element);
}


function check_ip(ip) {
    if (!ip) return Promise.resolve({ ip, banned: false });
    return fetch(`https://json.geoiplookup.io/${ip}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => {
            const country = data.country_name;
            if (!country) return { ip, banned: false };
            // alert(`Ваш IP-адрес ${ip} принадлежит стране ${country}`);
            const ban_flag = countries.some(banned =>
                country.toLowerCase().includes(banned.toLowerCase())
            );
            return { ip, banned: ban_flag, country };
        })
        .catch(error => {
            console.error('Подробности ошибки:', error);
            alert(`Ошибка при проверке IP ${ip}: ${error.message}`);
            return { ip, banned: false };
        });
}


function load_images_sequent_dialog() { // task 2
    let urls = [];
    for (let i = 0; i < 5; i++) {
        let url = prompt(`Введите URL картинки ${i + 1}:`);
        if (url === null) url = ''; 
        urls.push(url.trim());
    }
    let promises = urls.map(url => load_image(url));
    Promise.all(promises).then(results => {
        let container = document.getElementById('output');
        container.innerHTML = '';
        results.forEach(result => container.appendChild(result));
    });
}


function load_images_parallel_dialog() {    // task 3
    let urls = [];
    for (let i = 0; i < 5; i++) {
        let url = prompt(`Введите URL картинки ${i + 1}:`);
        if (url === null) url = '';
        urls.push(url.trim());
    }
    let container = document.getElementById('output');
    container.innerHTML = '';
    urls.forEach(url => {
        load_image(url).then(element => {
            container.appendChild(element);
        });
    });
}


async function load_images_sequent_async_dialog() { // task 4a
    let urls = [];
    for (let i = 0; i < 5; i++) {
        let url = prompt(`Введите URL картинки ${i + 1}:`);
        if (url === null) url = ''; 
        urls.push(url.trim());
    }
    let promises = urls.map(url => load_image(url));
    let results = await Promise.all(promises);
    let container = document.getElementById('output');
    container.innerHTML = '';
    results.forEach(result => container.appendChild(result));
}


async function load_images_parallel_async_dialog() {    // task 4b
    let urls = [];
    for (let i = 0; i < 5; i++) {
        let url = prompt(`Введите URL картинки ${i + 1}:`);
        if (url === null) url = '';
        urls.push(url.trim());
    }
    let container = document.getElementById('output');
    container.innerHTML = '';
    const tasks = urls.map(url => append_image(url, container));
    await Promise.all(tasks);
}


async function ip_security_dialog() {
    const ips = [];
    for (let i = 0; i < 5; i++) {
        let ip = prompt(`Введите IP-адрес ${i + 1}:`);
        if (ip === null) ip = '';
        ips.push(ip.trim());
    }
    let results = await Promise.all(ips.map(ip => check_ip(ip)));
    let ban_flag = results.some(r => r.banned);
    if (ban_flag) alert("Our services are not available in your country");
    else alert("Welcome to our website!");
    console.log(results);
}


while (true) {
    let choice = prompt(`
        Выберите задание:
        1: подсчёт количества загрузок страницы;
        2: загрузка изображений по URL последовательно;
        3: загрузка изображений по URL параллельно;
        4: загрузка изображений по URL последовательно асинхронно;
        5: загрузка изображений по URL параллельно асинхронно;
        6: проверка IP-адресов;
        0: завершить работу.
        `);
    if (choice === null) break;
    choice = choice.trim();
    if (choice === "") continue;
    if (choice === "0") break;

    const funcs = { 1: count_loads, 2: load_images_sequent_dialog, 3: load_images_parallel_dialog, 
        4: load_images_sequent_async_dialog, 5: load_images_parallel_async_dialog, 6: ip_security_dialog };
    if (funcs[choice]) funcs[choice]();
    else alert("Некорректный выбор!");
  }
