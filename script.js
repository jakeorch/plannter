let currentGrade = 0;

document.getElementById('list9').innerHTML = localStorage.getItem('list9');
document.getElementById('list10').innerHTML = localStorage.getItem('list10');
document.getElementById('list11').innerHTML = localStorage.getItem('list11');
document.getElementById('list12').innerHTML = localStorage.getItem('list12');
document.getElementById('list13').innerHTML = localStorage.getItem('list13');
document.getElementById('listActs').innerHTML = localStorage.getItem('listActs');

calcListDiff();

function openAdd(num) {
    currentGrade = num;

    document.getElementById('courseModal').classList.remove('fadeIn');
    document.getElementById('courseModal').classList.add('fadeOut');

    document.getElementById('selGradeLev').value = currentGrade;
}

function openAct() {
    document.getElementById('actModal').classList.remove('fadeIn');
    document.getElementById('actModal').classList.add('fadeOut');
}

function openDiff() {
    document.getElementById('diffModal').classList.remove('fadeIn');
    document.getElementById('diffModal').classList.add('fadeOut');
}

let buttons = document.querySelectorAll('.planBtns');

buttons.forEach((planBtns) => {
    planBtns.addEventListener('click', () => {
        // add/remove classes from all buttons
        buttons.forEach((planBtns) => {
            planBtns.classList.remove('border-slate-400');
            planBtns.classList.add('border-slate-100');
            planBtns.classList.add('hover:border-slate-300');
            planBtns.classList.add('hover:text-slate-600');
        });

        // add/remove classes to the clicked button
        planBtns.classList.add('border-slate-400');
        planBtns.classList.remove('border-slate-100');
        planBtns.classList.remove('hover:border-slate-300');
        planBtns.classList.remove('hover:text-slate-600');
    });
});

function showPlan() {
    document.getElementById('planDiv').classList.remove('hidden');
    document.getElementById('extraDiv').classList.add('hidden');
}

function showExtra() {
    document.getElementById('extraDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
}

function addCourse() {
    let input = document.getElementById('courseTitle').value.trim();
    let sameN = false;

    for (let i = 0; i < document.getElementsByTagName('li').length; i++) {
        let el = document.getElementsByTagName('li')[i];

        if (input.toLowerCase() == el.title.toLowerCase()) {
            sameN = true;
        }
    }

    if (input.length > 60) {
        alert('Course title is too long');
    } else if (input == '') {
        alert('Enter the title of your course');
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
        } else {
            t = document.createTextNode('');
            div.classList.add('norm');
        }
        div.appendChild(t);
        course.appendChild(div);

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

function addAct() {
    let input = document.getElementById('actTitle').value.trim();
    let sameN = false;

    for (let i = 0; i < document.getElementsByTagName('li').length; i++) {
        let el = document.getElementsByTagName('li')[i];

        if (input.toLowerCase() == el.title.toLowerCase()) {
            sameN = true;
        }
    }

    if (input.length > 60) {
        alert('Actvity title is too long');
    } else if (document.getElementById('actPosition').value.length > 20) {
        alert('Position title is too long');
    } else if (input == '') {
        alert('Enter the title of your activity');
    } else if (sameN) {
        alert('There is already an activity with that title');
        sameN = false;
    } else {
        let activity = document.createElement('li');

        activity.category = document.getElementById('selActCategory').value;
        let i = document.createElement('i');
        if (activity.category == 'Athletics') {
            i.className = 'actI fa-solid fa-dumbbell';
            i.ariaLabel = 'Athletics';
        } else if (activity.category == 'Club') {
            i.className = 'actI fa-solid fa-puzzle-piece';
            i.ariaLabel = 'Club';
        } else if (activity.category == 'Competition') {
            i.className = 'actI fa-solid fa-ranking-star';
            i.ariaLabel = 'Competition';
        } else if (activity.category == 'Work') {
            i.className = 'actI fa-solid fa-briefcase';
            i.ariaLabel = 'Employment';
        } else if (activity.category == 'Literature') {
            i.className = 'actI fa-solid fa-pencil';
            i.ariaLabel = 'Literature';
        } else if (activity.category == 'Math') {
            i.className = 'actI fa-solid fa-plus-minus';
            i.ariaLabel = 'Math';
        } else if (activity.category == 'Music') {
            i.className = 'actI fa-solid fa-music';
            i.ariaLabel = 'Music';
        } else if (activity.category == 'Science') {
            i.className = 'actI fa-solid fa-atom';
            i.ariaLabel = 'Science';
        } else if (activity.category == 'Tech') {
            i.className = 'actI fa-solid fa-desktop';
            i.ariaLabel = 'Technology';
        } else if (activity.category == 'Arts') {
            i.className = 'actI fa-solid fa-palette';
            i.ariaLabel = 'Visual/Performing Arts';
        } else if (activity.category == 'Volunteering') {
            i.className = 'actI fa-solid fa-hand-holding-hand';
            i.ariaLabel = 'Volunteering';
        } else if (activity.category == 'Other') {
            i.className = 'actI fa-solid fa-graduation-cap';
            i.ariaLabel = 'Other';
        }
        activity.appendChild(i);

        activity.title = input;
        let t = document.createTextNode(activity.title);
        activity.appendChild(t);
        activity.classList.add('item');

        activity.position = document.getElementById('actPosition').value;

        let div = document.createElement('div');
        div.className = 'attr';
        div.id = activity.title + 'Pos';
        t = document.createTextNode(activity.position);
        div.classList.add('actPos');
        div.appendChild(t);
        activity.appendChild(div);

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt xmark';
        btn.ariaLabel = 'Delete activity';
        btn.title = 'Delete activity';

        btn.appendChild(icon);
        div.appendChild(btn);
        activity.appendChild(div);

        localStorage.setItem(activity.title, activity.innerHTML);
        localStorage.setItem(activity.title + 'Pos', activity.position);

        document.getElementById('listActs').appendChild(activity);

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

        let glDiff = ((sum) + (0.15 * currentItems.length)) / 6;
        localStorage.setItem('list' + i + 'Diff', (Math.round((glDiff) * 100)) / 100); // round to nearest hundredth

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
    localStorage.setItem('listActs', document.getElementById('listActs').innerHTML);
}

window.onclick = function (event) {
    if (event.target == document.getElementById('courseModal') || event.target == document.getElementById('actModal') || event.target == document.getElementById('diffModal')) {
        hide();
    }
}

function hide() {
    document.getElementById('courseModal').classList.add('fadeIn');
    document.getElementById('courseModal').classList.remove('fadeOut');

    document.getElementById('courseTitle').value = '';
    document.getElementById('selSubject').value = 'hist';
    document.getElementById('selDiff').value = '1';

    document.getElementById('actModal').classList.add('fadeIn');
    document.getElementById('actModal').classList.remove('fadeOut');

    document.getElementById('actTitle').value = '';
    document.getElementById('selActCategory').value = 'Athletics';
    document.getElementById('actPosition').value = '';

    document.getElementById('diffModal').classList.add('fadeIn');
    document.getElementById('diffModal').classList.remove('fadeOut');
}