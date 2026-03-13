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
    let container = document.getElementById('output_1');
    container.innerHTML = '';
    urls.forEach(url => {
        load_image(url).then(element => {
            container.appendChild(element);
        });
    });
}


while (true) {
    let choice = prompt(`
        Выберите задание:
        1: подсчёт количества загрузок страницы;
        2: загрузка изображений по URL последовательно;
        3: загрузка изображений по URL параллельно;
        0: завершить работу.
        `);
    if (choice === null) break;
    choice = choice.trim();
    if (choice === "") continue;
    if (choice === "0") break;

    const funcs = { 1: count_loads, 2: load_images_sequent_dialog, 3: load_images_parallel_dialog };
    if (funcs[choice]) funcs[choice]();
    else alert("Некорректный выбор!");
  }