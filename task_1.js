function count_loads(){
    let count = localStorage.getItem('pageLoadCount');
    if (count === null) count = 0;
    else count = Number(count);
    count++;
    localStorage.setItem('pageLoadCount', count);
    alert(`Вы загрузили эту страницу ${count} раз ;)`);
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