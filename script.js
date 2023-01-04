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
    if (document.getElementById('courseTitle').value.length > 60) {
        alert('Course title is too long');
    } else if (document.getElementById('courseTitle').value == '') {
        alert('Enter a course title');
    } else {
        currentGrade = document.getElementById('selGradeLev').value;

        let course = document.createElement('li');
        course.title = document.getElementById('courseTitle').value;
        document.getElementById('courseTitle').value = '';

        let t = document.createTextNode(course.title);
        course.appendChild(t);
        course.classList.add('item');

        let div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-xmark';
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
}