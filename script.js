let counttodo = 0;          //кол-во задач
let countcompeled = 0;      //кол-во выполненых задач
let filter = 'all';

/*ВВОД НОВОЙ ЗАДАЧИ*/
document.querySelector('.input-text').addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        if (this.value.trim()){
            if (counttodo === 0){
                document.querySelector('.todos__button-container').style.display = 'flex';
                document.querySelector('.input-arrow').style.display = 'flex';
            }
            const newtask = document.createElement('div');
            newtask.className = 'todos__input';
            newtask.innerHTML = 
                '<div class="new-todo__input">' +
                    '<input type="checkbox" class="todo-checkbox">' + 
                    '<p style="flex: 1;">' + this.value.trim() + '</p>' +
                    '<button class="delete-button"></button>' +
                '</div>';
            document.querySelector('.new-todo').prepend(newtask);
            this.value = '';
            counttodo++;
            updatecount();
            updatefilter();
        }
    }
});

/*НАЖАТИЕ НА СТРЕЛКУ*/
document.querySelector('.input-arrow').addEventListener('click', function(){
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    const all = Array.from(checkboxes).every(e => e.checked);
    checkboxes.forEach(e => {
        e.checked = !all;
    });
    countcompeled = all ? 0 : checkboxes.length;
    updatecount();
    updatefilter();
});

/*УДАЛЕНИЕ ЗАДАЧ*/
document.querySelector('.new-todo').addEventListener('click', function(e){
    if (e.target.classList.contains('delete-button')){
        if (e.target.closest('.todos__input').querySelector('.todo-checkbox').checked){
            countcompeled--;
        }
        e.target.closest('.todos__input').remove(); 
        counttodo--;
        updatecount();
        updatefilter();
        if (counttodo === 0){
            document.querySelector('.todos__button-container').style.display = 'none';
            document.querySelector('.input-arrow').style.display = 'none';
        }
    }
});

/*ИЗМЕНЕНИЕ СОСТОЯНИЯ ЗАДАЧ*/
document.querySelector('.new-todo').addEventListener('change', function(e){
    if (e.target.classList.contains('todo-checkbox')){
        if (e.target.checked){
            countcompeled++;
        }
        else{
            countcompeled--;
        }
        updatecount();
        updatefilter();
    }
});

/*УДАЛЕНИЕ ЗАВЕРШЕННЫХ ЗАДАЧ*/
document.querySelector('.todos__button-clear a').addEventListener('click', function(){
    document.querySelectorAll('.new-todo .todos__input').forEach(e =>{
        if(e.querySelector('.todo-checkbox').checked){
            e.remove();
            counttodo--;
            countcompeled--;
        }
    });
    updatecount();
    updatefilter();
});

/*ФИЛЬТР-КНОПКИ*/
document.querySelectorAll('.todos__button-status button').forEach((button, i) =>{
    button.addEventListener('click', function(){
        document.querySelectorAll('.todos__button-status button').forEach(e =>{
            e.classList.remove('active');
        });
        this.classList.add('active');
        filter = ['all', 'active', 'completed'][i];
        updatefilter();
    });
});

/*ОБНОВЛЕНИЕ КОЛ-ВА ЗАДАЧ*/
function updatecount(){
    document.querySelector('.todos__count').textContent = 
    `${counttodo - countcompeled} item${counttodo - countcompeled == 1? '' : 's'} left`;

    if(countcompeled > 0){
        document.querySelector('.todos__button-clear a').style.display = 'block';
    }
    else{
        document.querySelector('.todos__button-clear a').style.display = 'none';
    }

    if(counttodo === 0){
        document.querySelector('.todos__button-container').style.display = 'none';
        document.querySelector('.input-arrow').style.display = 'none';
    }
}

/*ПОКАЗ / СКРЫТИЕ ЗАДАЧ ПО ФИЛЬТР-КНОПКАМ*/
function updatefilter(){
    const todos = document.querySelectorAll('.new-todo .todos__input');
    todos.forEach(e =>{
        switch(filter){
            case 'active':
                e.style.display = e.querySelector('.todo-checkbox').checked ? 'none' : 'block';
                break;
            case 'completed':
                e.style.display = e.querySelector('.todo-checkbox').checked ? 'block' : 'none';
                break;
            case 'all':
                default:
                e.style.display = 'block';
                break;
        }
    });
}