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


while (true) {
    let choice = prompt(`
        Выберите задание:
        1: подсчёт количества загрузок страницы;
        2: 
        0: завершить работу.
        `);
    if (choice === null) break;
    choice = choice.trim();
    if (choice === "") continue;
    if (choice === "0") break;

    const funcs = { 1: count_loads};
    if (funcs[choice]) funcs[choice]();
    else alert("Некорректный выбор!");
  }