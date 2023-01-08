// TODO
// MAKE SURE NO COURSE NAMES ARE THE SAME

let currentGrade = 0;

document.getElementById('list9').innerHTML = localStorage.getItem('list9');
document.getElementById('list10').innerHTML = localStorage.getItem('list10');
document.getElementById('list11').innerHTML = localStorage.getItem('list11');
document.getElementById('list12').innerHTML = localStorage.getItem('list12');

function openAdd(num) {
    currentGrade = num;

    document.getElementById('modal').classList.remove('fadeIn');
    document.getElementById('modal').classList.add('fadeOut');

    document.getElementById('selGradeLev').value = currentGrade;
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

        if (course.sub == 'eng') {
            sbjI = 'pencil';
        } else if (course.sub == 'hist') {
            sbjI = 'landmark'; // landmark-dome
        } else if (course.sub == 'math') {
            sbjI = 'plus-minus'; // square-root-variable
        } else if (course.sub == 'sci') {
            sbjI = 'atom'; // flask
        } else if (course.sub == 'lang') {
            sbjI = 'globe';
        } else if (course.sub == 'art') {
            sbjI = 'palette';
        } else if (course.sub == 'pe') {
            sbjI = 'dumbbell';
        } else if (course.sub == 'other') {
            sbjI = 'graduation-cap';
        }
        let i = document.createElement('i');
        i.className = 'subjectIcon fa-solid fa-' + sbjI;
        course.appendChild(i);

        course.title = input;
        let t = document.createTextNode(course.title);
        course.appendChild(t);
        course.classList.add('item');

        course.diff = document.getElementById('selDiff').value;

        if (course.diff !== 'Normal') {
            let div = document.createElement('div');
            t = document.createTextNode(course.diff);
            div.appendChild(t);
            div.className = 'attr';
            div.id = course.title + 'Diff';
            if (course.diff == 'AP') {
                div.classList.add('ap');
            } else if (course.diff == 'Honors') {
                div.classList.add('hon');
            } else if (course.diff == 'Advanced') {
                div.classList.add('adv');
            }
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

        document.getElementById('list' + currentGrade).appendChild(course);

        let xmark = document.getElementsByClassName('xmark');
        for (i = 0; i < xmark.length; i++) {
            xmark[i].onclick = function () {
                clickXmark(this.parentElement.parentElement);
            }
        }

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
        saveList();
    }
}

function saveList() { // call when anything in list is updated
    localStorage.setItem('list9', document.getElementById('list9').innerHTML);
    localStorage.setItem('list10', document.getElementById('list10').innerHTML);
    localStorage.setItem('list11', document.getElementById('list11').innerHTML);
    localStorage.setItem('list12', document.getElementById('list12').innerHTML);
}

window.onclick = function (event) {
    if (event.target == document.getElementById('modal')) {
        hide();
    }
}

function hide() {
    document.getElementById('modal').classList.add('fadeIn');
    document.getElementById('modal').classList.remove('fadeOut');

    document.getElementById('courseTitle').value = '';
    document.getElementById('selSubject').value = 'eng';
    document.getElementById('selDiff').value = 'Normal';
}