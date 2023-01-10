let currentGrade = 0;

getLists();
getCourses();
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
    document.getElementById('actsDiv').classList.add('hidden');
}

function showExtra() {
    document.getElementById('actsDiv').classList.remove('hidden');
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
        course.title = input;

        course.sub = document.getElementById('selSubject').value;
        let i = document.createElement('i');
        i.id = course.title + 'sbjI'
        i.className = getSubjectIcon(course.sub);
        i.ariaLabel = course.sub;
        course.appendChild(i);

        let t = document.createTextNode(course.title);
        course.appendChild(t);
        course.classList.add('item');

        course.gradeLevel = currentGrade;

        course.diff = document.getElementById('selDiff').value;

        let div = document.createElement('div');
        div.id = course.title + 'Diff';
        [diffText, diffClass] = getDiff(course.diff);
        t = document.createTextNode(diffText);
        div.className = diffClass;
        div.appendChild(t);
        course.appendChild(div);

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit course';
        btn.title = 'Edit course';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove course';
        btn.title = 'Remove course';
        btn.appendChild(icon);
        div.appendChild(btn);

        course.appendChild(div);

        localStorage.setItem(course.title, course.innerHTML);
        localStorage.setItem(course.title + 'GradeLevel', course.gradeLevel);
        localStorage.setItem(course.title + 'Sub', course.sub);
        localStorage.setItem(course.title + 'Diff', course.diff);

        document.getElementById('list' + currentGrade).appendChild(course);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                clickPen(this.parentElement.parentElement);
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        calcListDiff();
        saveLists();
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
        btn.ariaLabel = 'Remove activity';
        btn.title = 'Remove activity';

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

        saveLists();
        hide();
    }
}

let pen = document.getElementsByClassName('pen');
for (i = 0; i < pen.length; i++) {
    pen[i].onclick = function () {
        clickPen(this.parentElement.parentElement);
    }
}

let trash = document.getElementsByClassName('trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this.parentElement.parentElement);
    }
}

function clickPen(course) {
    document.getElementById('courseTitleEdit').value = course.title;
    document.getElementById('selGradeLevEdit').value = course.gradeLevel;
    document.getElementById('selSubjectEdit').value = course.sub;
    document.getElementById('selDiffEdit').value = course.diff;

    document.getElementById('editCourseModal').classList.remove('fadeIn');
    document.getElementById('editCourseModal').classList.add('fadeOut');

}

function clickTrash(course) {
    if (confirm('Are you sure you want to remove \"' + course.title + '\"?')) {
        course.remove();

        calcListDiff();
        saveLists();
    }
}

function saveCourse() {
    if (course.gradeLevel !== document.getElementById('selGradeLevEdit').value) {
        course.gradeLevel = document.getElementById('selGradeLevEdit').value;
        document.getElementById('list' + course.gradeLevel).appendChild(course.cloneNode(true));

        course.remove();
    }
    course.title = document.getElementById('courseTitleEdit').value;
    course.sub = document.getElementById('selSubjectEdit').value;
    course.diff = document.getElementById('selDiffEdit').value;

    localStorage.setItem(course.title, course.innerHTML);
    localStorage.setItem(course.title + 'GradeLevel', course.gradeLevel);
    localStorage.setItem(course.title + 'Sub', course.sub);
    localStorage.setItem(course.title + 'Diff', course.diff);

    document.getElementById(course.title + 'sbjI').className = getSubjectIcon(course.sub);
    document.getElementById(course.title + 'sbjI').ariaLabel = course.sub;

    [diffText, diffClass] = getDiff(course.diff);
    document.getElementById(course.title + 'Diff').className = diffClass;
    document.getElementById(course.title + 'Diff').innerText = diffText;

    saveLists();
    getLists();
    getCourses();
    calcListDiff();

    let pen = document.getElementsByClassName('pen');
    for (i = 0; i < pen.length; i++) {
        pen[i].onclick = function () {
            clickPen(this.parentElement.parentElement);
        }
    }

    let trash = document.getElementsByClassName('trash');
    for (i = 0; i < trash.length; i++) {
        trash[i].onclick = function () {
            clickTrash(this.parentElement.parentElement);
        }
    }

    hide();
}

function getCourses() { // gets all stored info of each course
    for (let i = 9; i <= 13; i++) {
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];
            course.gradeLevel = localStorage.getItem(course.title + 'GradeLevel');
            course.sub = localStorage.getItem(course.title + 'Sub');
            course.diff = localStorage.getItem(course.title + 'Diff');
        }
    }
}

function calcListDiff() { // calcs diffs of ALL lists
    for (let i = 9; i <= 13; i++) {
        let sum = 0;
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];

            sum = +sum + +course.diff;
        }

        let glDiff = ((sum) + (0.15 * currentItems.length)) / 6;
        localStorage.setItem('list' + i + 'Diff', (Math.round((glDiff) * 100)) / 100); // round to nearest hundredth

        if (currentItems.length < 1 || localStorage.getItem('list' + i + 'Diff') <= 0) {
            document.getElementById('diff' + i).innerText = '';
        } else if (localStorage.getItem('list' + i + 'Diff') < 1) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Easy';
        } else if (localStorage.getItem('list' + i + 'Diff') < 2) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Normal';
        } else if (localStorage.getItem('list' + i + 'Diff') < 3) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Hard';
        } else if (localStorage.getItem('list' + i + 'Diff') < 4) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Difficult';
        } else if (localStorage.getItem('list' + i + 'Diff') < 5) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Challenging';
        } else if (localStorage.getItem('list' + i + 'Diff') >= 5) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Extreme';
        }
    }
}

function saveLists() {
    localStorage.setItem('list9', document.getElementById('list9').innerHTML);
    localStorage.setItem('list10', document.getElementById('list10').innerHTML);
    localStorage.setItem('list11', document.getElementById('list11').innerHTML);
    localStorage.setItem('list12', document.getElementById('list12').innerHTML);
    localStorage.setItem('list13', document.getElementById('list13').innerHTML);
    localStorage.setItem('listActs', document.getElementById('listActs').innerHTML);
}

function getLists() {
    document.getElementById('list9').innerHTML = localStorage.getItem('list9');
    document.getElementById('list10').innerHTML = localStorage.getItem('list10');
    document.getElementById('list11').innerHTML = localStorage.getItem('list11');
    document.getElementById('list12').innerHTML = localStorage.getItem('list12');
    document.getElementById('list13').innerHTML = localStorage.getItem('list13');
    document.getElementById('listActs').innerHTML = localStorage.getItem('listActs');
}

function getSubjectIcon(sub) {
    if (sub == 'English') {
        return 'sbjI fa-solid fa-pencil';
    } else if (sub == 'History') {
        return 'sbjI fa-solid fa-landmark'; // landmark-dome
    } else if (sub == 'Math') {
        return 'sbjI fa-solid fa-plus-minus'; // square-root-variable
    } else if (sub == 'Science') {
        return 'sbjI fa-solid fa-atom'; // flask
    } else if (sub == 'Foreign Language') {
        return 'sbjI fa-solid fa-globe';
    } else if (sub == 'Art') {
        return 'sbjI fa-solid fa-palette';
    } else if (sub == 'PE') {
        return 'sbjI fa-solid fa-dumbbell';
    } else if (sub == 'Other/Elective') {
        return 'sbjI fa-solid fa-graduation-cap';
    }
}

function getDiff(diff) {
    if (diff == '4.5') {
        return ['IB', 'attr ib'];
    } else if (diff == '3.5') {
        return ['AP', 'attr ap'];
    } else if (diff == '2.75') {
        return ['Honors', 'attr hon'];
    } else if (diff == '1.75') {
        return ['Advanced', 'attr adv'];
    } else {
        return ['', 'attr norm'];
    }
}

window.onclick = function (event) {
    if (event.target == document.getElementById('courseModal') || event.target == document.getElementById('editCourseModal') || event.target == document.getElementById('actModal') || event.target == document.getElementById('diffModal')) {
        hide();
    }
}

function hide() {
    document.getElementById('courseModal').classList.add('fadeIn');
    document.getElementById('courseModal').classList.remove('fadeOut');

    document.getElementById('courseTitle').value = '';
    document.getElementById('selSubject').value = 'History';
    document.getElementById('selDiff').value = '1';

    document.getElementById('editCourseModal').classList.add('fadeIn');
    document.getElementById('editCourseModal').classList.remove('fadeOut');

    document.getElementById('actModal').classList.add('fadeIn');
    document.getElementById('actModal').classList.remove('fadeOut');

    document.getElementById('actTitle').value = '';
    document.getElementById('selActCategory').value = 'Athletics';
    document.getElementById('actPosition').value = '';

    document.getElementById('diffModal').classList.add('fadeIn');
    document.getElementById('diffModal').classList.remove('fadeOut');
}