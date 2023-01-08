let currentGrade = 0;

document.getElementById('list9').innerHTML = localStorage.getItem('list9');
document.getElementById('list10').innerHTML = localStorage.getItem('list10');
document.getElementById('list11').innerHTML = localStorage.getItem('list11');
document.getElementById('list12').innerHTML = localStorage.getItem('list12');
document.getElementById('list13').innerHTML = localStorage.getItem('list13');

calcListDiff();

function openAdd(num) {
    currentGrade = num;

    document.getElementById('addModal').classList.remove('fadeIn');
    document.getElementById('addModal').classList.add('fadeOut');

    document.getElementById('selGradeLev').value = currentGrade;
}

function openDiff() {
    document.getElementById('diffModal').classList.remove('fadeIn');
    document.getElementById('diffModal').classList.add('fadeOut');
}

function add() {
    let input = document.getElementById('courseTitle').value.trim();
    let sameN = false;

    for (let i = 0; i < document.getElementsByTagName('li').length; i++) {
        let course = document.getElementsByTagName('li')[i];

        if (input.toLowerCase() == course.title.toLowerCase()) {
            sameN = true;
        }
    }

    if (input.length > 60) {
        alert('Course title is too long');
    } else if (input == '') {
        alert('Enter a course title');
    } else if (sameN) {
        alert('There is already a course with that title');
        sameN = false;
    } else {
        currentGrade = document.getElementById('selGradeLev').value;

        let course = document.createElement('li');

        course.sub = document.getElementById('selSubject').value;

        let i = document.createElement('i');
        if (course.sub == 'eng') {
            i.className = 'sbjI fa-solid fa-pencil';
            i.ariaLabel = 'English';
        } else if (course.sub == 'hist') {
            i.className = 'sbjI fa-solid fa-landmark'; // landmark-dome
            i.ariaLabel = 'History';
        } else if (course.sub == 'math') {
            i.className = 'sbjI fa-solid fa-plus-minus'; // square-root-variable
            i.ariaLabel = 'Math';
        } else if (course.sub == 'sci') {
            i.className = 'sbjI fa-solid fa-atom'; // flask
            i.ariaLabel = 'Science';
        } else if (course.sub == 'lang') {
            i.className = 'sbjI fa-solid fa-globe';
            i.ariaLabel = 'Foreign Language';
        } else if (course.sub == 'art') {
            i.className = 'sbjI fa-solid fa-palette';
            i.ariaLabel = 'Art';
        } else if (course.sub == 'pe') {
            i.className = 'sbjI fa-solid fa-dumbbell';
            i.ariaLabel = 'PE';
        } else if (course.sub == 'other') {
            i.className = 'sbjI fa-solid fa-graduation-cap';
            i.ariaLabel = 'Other/Elective';
        }
        course.appendChild(i);

        course.title = input;
        let t = document.createTextNode(course.title);
        course.appendChild(t);
        course.classList.add('item');

        course.diff = document.getElementById('selDiff').value;

        if (course.diff !== '1') {
            let div = document.createElement('div');
            div.className = 'attr';
            div.id = course.title + 'Diff';
            if (course.diff == '4.5') {
                t = document.createTextNode('IB');
                div.classList.add('ib');
            } else if (course.diff == '3.5') {
                t = document.createTextNode('AP');
                div.classList.add('ap');
            } else if (course.diff == '2.5') {
                t = document.createTextNode('Honors');
                div.classList.add('hon');
            } else if (course.diff == '1.5') {
                t = document.createTextNode('Advanced');
                div.classList.add('adv');
            }
            div.appendChild(t);
            course.appendChild(div);
        }

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt xmark';
        btn.ariaLabel = 'Delete course';
        btn.title = 'Delete course';

        btn.appendChild(icon);
        div.appendChild(btn);
        course.appendChild(div);

        localStorage.setItem(course.title, course.innerHTML);
        localStorage.setItem(course.title + 'Diff', course.diff);

        document.getElementById('list' + currentGrade).appendChild(course);

        let xmark = document.getElementsByClassName('xmark');
        for (i = 0; i < xmark.length; i++) {
            xmark[i].onclick = function () {
                clickXmark(this.parentElement.parentElement);
            }
        }

        calcListDiff();
        saveList();
        hide();
    }
}

let xmark = document.getElementsByClassName('xmark');
for (i = 0; i < xmark.length; i++) {
    xmark[i].onclick = function () {
        clickXmark(this.parentElement.parentElement);
    }
}

function clickXmark(course) {
    if (confirm('Are you sure you want to delete \"' + course.title + '\"?')) {
        course.remove();

        calcListDiff();
        saveList();
    }
}

function calcListDiff() { // calcs diffs of ALL lists
    for (let i = 9; i <= 13; i++) {
        let sum = 0;
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];
            course.diff = localStorage.getItem(course.title + 'Diff');

            sum = +sum + +course.diff;
        }

        localStorage.setItem('list' + i + 'Diff', (Math.round((((sum) + (0.15 * currentItems.length)) / 6) * 10)) / 10);

        if (currentItems.length < 1 || localStorage.getItem('list' + i + 'Diff') <= 0) {
            document.getElementById('diff' + i).innerText = '';
        } else if (localStorage.getItem('list' + i + 'Diff') < 2) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Normal';
        } else if (localStorage.getItem('list' + i + 'Diff') < 3) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Hard';
        } else if (localStorage.getItem('list' + i + 'Diff') < 4) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Difficult';
        } else if (localStorage.getItem('list' + i + 'Diff') >= 4) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Challenging';
        }
    }
}

function saveList() {
    localStorage.setItem('list9', document.getElementById('list9').innerHTML);
    localStorage.setItem('list10', document.getElementById('list10').innerHTML);
    localStorage.setItem('list11', document.getElementById('list11').innerHTML);
    localStorage.setItem('list12', document.getElementById('list12').innerHTML);
    localStorage.setItem('list13', document.getElementById('list13').innerHTML);
}

window.onclick = function (event) {
    if (event.target == document.getElementById('addModal') || event.target == document.getElementById('diffModal')) {
        hide();
    }
}

function hide() {
    document.getElementById('addModal').classList.add('fadeIn');
    document.getElementById('addModal').classList.remove('fadeOut');

    document.getElementById('diffModal').classList.add('fadeIn');
    document.getElementById('diffModal').classList.remove('fadeOut');

    document.getElementById('courseTitle').value = '';
    document.getElementById('selSubject').value = 'eng';
    document.getElementById('selDiff').value = '1';
}