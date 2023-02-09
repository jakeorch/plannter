const currentYear = new Date().getFullYear();
const currentMonth = Number(String(new Date().getMonth() + 1).padStart(2, '0'));
const currentDay = Number(String(new Date().getDate()).padStart(2, '0'));
const currentDate = new Date(currentYear, currentMonth - 1, currentDay);

const oneDay = 24 * 60 * 60 * 1000; // hours * mins * secs * millisecs

input = document.getElementById('courseTitle');
input.addEventListener('keyup', function () {
    if (input.value.toLowerCase().includes('advance') || input.value.toLowerCase().includes('accel') || input.value.toLowerCase().includes('honor') || input.value.toLowerCase().includes('ap') || input.value.toLowerCase().includes('ib')) {
        document.getElementById('diffTip').classList.remove('hidden');
        input.classList.remove('mb-4');
    } else {
        document.getElementById('diffTip').classList.add('hidden');
        input.classList.add('mb-4');
    }
});

inputE = document.getElementById('courseTitleEdit');
inputE.addEventListener('keyup', function () {
    if (inputE.value.toLowerCase().includes('advance') || inputE.value.toLowerCase().includes('accel') || inputE.value.toLowerCase().includes('honor') || inputE.value.toLowerCase().includes('ap') || inputE.value.toLowerCase().includes('ib')) {
        document.getElementById('diffTipE').classList.remove('hidden');
        inputE.classList.remove('mb-4');
    } else {
        document.getElementById('diffTipE').classList.add('hidden');
        inputE.classList.add('mb-4');
    }
});

getLists();
saveLists();
getCourses();
getActs();
getTests();
getCD();
calcListDiff();
updateAllItems();

function toggleMenu() {
    document.getElementById('menuDiv').classList.toggle('hidden');
    document.getElementById('menuDiv').classList.toggle('block');
}

function selTestSpecies() {
    document.getElementById('testSubSpecies').classList.add('hidden');
    document.getElementById('testSpeciesOther').classList.add('hidden');
    document.getElementById('readingTestScore').classList.add('hidden');
    document.getElementById('mathTestScore').classList.add('hidden');

    if (document.getElementById('selTestSpecies').value == 'AP') {
        document.getElementById('testSubSpecies').classList.remove('hidden');
    } else if (document.getElementById('selTestSpecies').value == 'SAT' || document.getElementById('selTestSpecies').value == 'PSAT') {
        document.getElementById('readingTestScore').classList.remove('hidden');
        document.getElementById('mathTestScore').classList.remove('hidden');
    } else if (document.getElementById('selTestSpecies').value == 'Other') {
        document.getElementById('testSpeciesOther').classList.remove('hidden');
    }
}

function selTestSpeciesEdit() {
    document.getElementById('testSubSpeciesdit').classList.add('hidden');
    document.getElementById('testSpeciesOtherEdit').classList.add('hidden');
    document.getElementById('readingTestScoreEdit').classList.add('hidden');
    document.getElementById('mathTestScoreEdit').classList.add('hidden');

    if (document.getElementById('selTestSpeciesEdit').value == 'AP') {
        document.getElementById('testSubSpeciesEdit').classList.remove('hidden');
    } else if (document.getElementById('selTestSpeciesEdit').value == 'SAT' || document.getElementById('selTestSpeciesEdit').value == 'PSAT') {
        document.getElementById('readingTestScoreEdit').classList.remove('hidden');
        document.getElementById('mathTestScoreEdit').classList.remove('hidden');
    } else if (document.getElementById('selTestSpeciesEdit').value == 'Other') {
        document.getElementById('testSubSpeciesEdit').classList.remove('hidden');
    }
}

function openAddCourse(num) {
    document.getElementById('courseModal').classList.remove('fadeIn');
    document.getElementById('courseModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');

    document.getElementById('selGradeLev').value = num;
}

function openAddAct() {
    document.getElementById('actModal').classList.remove('fadeIn');
    document.getElementById('actModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openAddTest() {
    document.getElementById('testModal').classList.remove('fadeIn');
    document.getElementById('testModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openDiff() {
    document.getElementById('diffModal').classList.remove('fadeIn');
    document.getElementById('diffModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openDiffPercent() {
    document.getElementById('diffPercentModal').classList.remove('fadeIn');
    document.getElementById('diffPercentModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function openCD() {
    document.getElementById('countdownModal').classList.remove('fadeIn');
    document.getElementById('countdownModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');

    if (gradDay != NaN && gradDay != null && gradDay != 0) {
        document.getElementById('gradDay').value = gradDay;
    }
    if (gradMonth != NaN && gradMonth != null && gradMonth != 0) {
        document.getElementById('gradMonth').value = gradMonth;
    }
    if (gradYear != NaN && gradYear != null && gradYear != 0) {
        document.getElementById('gradYear').value = gradYear;
    }
}

let buttons = document.querySelectorAll('.planBtns');
buttons.forEach((planBtns) => {
    planBtns.addEventListener('click', () => {
        // add/remove classes from all buttons
        buttons.forEach((planBtns) => {
            planBtns.classList.remove('bg-green-600/30');
            planBtns.classList.remove('text-slate-600');
            planBtns.classList.add('text-slate-500');
            planBtns.classList.add('hover:bg-slate-400/30');
            planBtns.classList.add('active:bg-slate-400/50');
        });

        // add/remove classes to the clicked button
        planBtns.classList.add('bg-green-600/30');
        planBtns.classList.add('text-slate-600');
        planBtns.classList.remove('text-slate-500');
        planBtns.classList.remove('hover:bg-slate-400/30');
        planBtns.classList.remove('active:bg-slate-400/50');
    });
});

function showPlan() {
    document.getElementById('planDiv').classList.remove('hidden');
    document.getElementById('actsDiv').classList.add('hidden');
    document.getElementById('testsDiv').classList.add('hidden');
    toggleMenu();
}

function showExtra() {
    document.getElementById('actsDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
    document.getElementById('testsDiv').classList.add('hidden');
    toggleMenu();
}

function showTests() {
    document.getElementById('testsDiv').classList.remove('hidden');
    document.getElementById('planDiv').classList.add('hidden');
    document.getElementById('actsDiv').classList.add('hidden');
    toggleMenu();
}

function addCourse(cName, cGradeLevel, cSub, cAdvLevel, cDiff) {
    if (cName.length > 60) {
        alert('Course title is too long');
    } else if (cName == '') {
        alert('Enter the title of your course');
    } else {
        let course = document.createElement('li');
        course.name = cName;
        // course.draggable = true;

        course.id = 'C' + Math.floor(100000000 + Math.random() * 900000000);

        course.sub = cSub;
        let i = document.createElement('i');
        i.id = course.id + 'SbjI'
        i.className = getSubjectIcon(course.sub);
        i.ariaLabel = course.sub;
        course.appendChild(i);

        let t = document.createTextNode(course.name);
        course.appendChild(t);
        course.className = 'item course';

        course.gradeLevel = cGradeLevel;

        course.diff = cAdvLevel;
        course.diff2 = cDiff;
        course.diffFull = course.diff * course.diff2;

        let div = document.createElement('div');
        div.id = course.id + 'Diff';
        [diffText, diffClass] = getDiff(course.diff);
        t = document.createTextNode(diffText);
        div.className = diffClass;
        div.appendChild(t);
        course.appendChild(div);

        div = document.createElement('div');
        div.id = course.id + 'Diff2';
        diff2Class = getDiff2(course.diff2);
        div.className = diff2Class;
        course.appendChild(div);

        if (course.sub == 'PE') {
            course.diffFull = course.diffFull * 0.01;
        }

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

        localStorage.setItem(course.id + 'Name', course.name);
        localStorage.setItem(course.id + 'GradeLevel', course.gradeLevel);
        localStorage.setItem(course.id + 'Sub', course.sub);
        localStorage.setItem(course.id + 'Diff', course.diff);
        localStorage.setItem(course.id + 'Diff2', course.diff2);
        localStorage.setItem(course.id + 'DiffFull', course.diffFull);

        document.getElementById('list' + cGradeLevel).appendChild(course);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
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

function addAct(aName, aDesc, aCategory, aPos) {
    if (aName.length > 60) {
        alert('Actvity title is too long');
    } else if (aDesc.length > 160) {
        alert('Actvity description is too long');
    } else if (aPos.length > 20) {
        alert('Position title is too long');
    } else if (aName == '') {
        alert('Enter the title of your activity');
    } else {
        let activity = document.createElement('li');
        activity.name = aName;

        activity.id = 'A' + Math.floor(100000000 + Math.random() * 900000000);

        activity.category = aCategory;
        let i = document.createElement('i');
        i.id = activity.id + 'ActI';
        actClass = getActIcon(activity.category);
        i.className = actClass;
        i.ariaLabel = activity.category;
        activity.appendChild(i);

        let t = document.createTextNode(activity.name);
        activity.appendChild(t);
        activity.className = 'item activity';

        activity.pos = aPos;

        let div = document.createElement('div');
        div.className = 'attr actPos';
        div.id = activity.id + 'Pos';
        t = document.createTextNode(activity.pos);
        div.appendChild(t);
        activity.appendChild(div);

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit activity';
        btn.title = 'Edit activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove activity';
        btn.title = 'Remove activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        activity.appendChild(div);

        activity.desc = aDesc;

        if (activity.desc != '') {
            let h2 = document.createElement('h2');
            h2.className = 'desc';
            h2.id = activity.id + 'Desc';
            t = document.createTextNode(activity.desc);
            h2.appendChild(t);
            activity.appendChild(h2);
        }

        localStorage.setItem(activity.id + 'Name', activity.name);
        localStorage.setItem(activity.id + 'Desc', activity.desc);
        localStorage.setItem(activity.id + 'Category', activity.category);
        localStorage.setItem(activity.id + 'Pos', activity.pos);

        document.getElementById('listActs').appendChild(activity);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        saveLists();
        hide();
    }
}

function addTest(tSpecies, tSubSpecies, tSpeciesOther, tMonth, tYear, tScore, tReadScore, tMathScore) {
    if (tMonth < 1 || tMonth > 12) {
        alert('Enter a valid month 1-12');
    } else if (tYear < 1900 || tYear > currentYear + 10) {
        alert('Enter a valid year');
    } else if (tScore < 0 || tScore > 9999 || tReadScore < 0 || tMathScore < 0 || ((tSpecies == 'SAT' || tSpecies == 'PSAT') && (tReadScore != '' && tMathScore != '' && +tReadScore + +tMathScore != +tScore))) {
        alert('Score not possible');
    } else if (tScore == '' || (tReadScore == '' && tMathScore != '') || (tReadScore != '' && tMathScore == '')) {
        alert('Enter the test score');
    } else if (tSubSpecies.length > 30) {
        alert('Subject title is too long');
    } else if (tSubSpecies == '' && tSpecies == 'AP') {
        alert('Enter the course');
    } else if (tSpeciesOther.length > 30) {
        alert('Test name is too long');
    } else if (tSpeciesOther == '' && tSpecies == 'Other') {
        alert('Enter the test name');
    } else {
        let test = document.createElement('li');
        test.id = 'T' + Math.floor(100000000 + Math.random() * 900000000);

        let i = document.createElement('i');
        i.id = test.id + 'TestI';
        i.className = 'testI fa-solid fa-file-lines';
        i.ariaLabel = 'Test icon';
        test.appendChild(i);

        test.species = tSpecies;
        test.subSpecies = tSubSpecies;
        test.speciesOther = tSpeciesOther;

        test.year = tYear;
        if (tMonth.length == 1) {
            test.month = '0' + tMonth;
        } else {
            test.month = tMonth;
        }

        t = `${test.species} — ${test.month}/${test.year}`;
        if (test.species == 'AP') {
            t = `${test.species} ${test.subSpecies} — ${test.month}/${test.year}`;
        } else if (test.species == 'Other') {
            t = `${test.speciesOther} — ${test.month}/${test.year}`;
        }
        test.appendChild(document.createTextNode(t));
        test.className = 'item test';
        test.name = t;

        test.score = tScore;
        test.readScore = tReadScore;
        test.mathScore = tMathScore;

        let div = document.createElement('div');
        div.className = 'testScore';
        div.id = test.id + 'Score';
        t = document.createTextNode(test.score);
        div.appendChild(t);
        test.appendChild(div);

        if (test.species == 'SAT' || test.species == 'PSAT') {
            if (test.readScore != '' && test.mathScore != '') {
                div = document.createElement('div');
                div.className = 'testReadScore';
                div.id = test.id + 'ReadScore';
                t = document.createTextNode('Reading: ' + test.readScore);
                div.appendChild(t);
                test.appendChild(div);

                div = document.createElement('div');
                div.className = 'testMathScore';
                div.id = test.id + 'MathScore';
                t = document.createTextNode('Math: ' + test.mathScore);
                div.appendChild(t);
                test.appendChild(div);
            }
        }

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit test';
        btn.title = 'Edit test';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove test';
        btn.title = 'Remove test';
        btn.appendChild(icon);
        div.appendChild(btn);

        test.appendChild(div);

        localStorage.setItem(test.id + 'Species', test.species);
        localStorage.setItem(test.id + 'SubSpecies', test.subSpecies);
        localStorage.setItem(test.id + 'SpeciesOther', test.speciesOther);
        localStorage.setItem(test.id + 'Month', test.month);
        localStorage.setItem(test.id + 'Year', test.year);
        localStorage.setItem(test.id + 'Score', test.score);
        localStorage.setItem(test.id + 'ReadingScore', test.readScore);
        localStorage.setItem(test.id + 'MathScore', test.mathScore);
        localStorage.setItem(test.id + 'Name', test.name);

        document.getElementById('listTests').appendChild(test);

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
            }
        }

        let trash = document.getElementsByClassName('trash');
        for (i = 0; i < trash.length; i++) {
            trash[i].onclick = function () {
                clickTrash(this.parentElement.parentElement);
            }
        }

        saveLists();
        hide();
    }
}

let pen = document.getElementsByClassName('pen');
for (i = 0; i < pen.length; i++) {
    pen[i].onclick = function () {
        if (this.parentElement.parentElement.id.startsWith('C')) {
            clickPen(this.parentElement.parentElement);
        } else if (this.parentElement.parentElement.id.startsWith('A')) {
            clickPenAct(this.parentElement.parentElement);
        } else if (this.parentElement.parentElement.id.startsWith('T')) {
            clickPenTest(this.parentElement.parentElement);
        }
    }
}

let trash = document.getElementsByClassName('trash');
for (i = 0; i < trash.length; i++) {
    trash[i].onclick = function () {
        clickTrash(this.parentElement.parentElement);
    }
}

function clickPen(c) {
    getCourses();

    course = c;

    document.getElementById('courseTitleEdit').value = course.name;
    document.getElementById('selGradeLevEdit').value = course.gradeLevel;
    document.getElementById('selSubjectEdit').value = course.sub;
    document.getElementById('selDiffEdit').value = course.diff;
    document.getElementById('selDiff2Edit').value = course.diff2;

    if (course.diff2 != 1) {
        document.getElementById('advOptEditCI').classList.add('rotate-90');
        document.getElementById('advOptionsEditC').classList.remove('hidden');
    }

    document.getElementById('editCourseModal').classList.remove('fadeIn');
    document.getElementById('editCourseModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function clickPenAct(a) {
    getActs();

    activity = a;

    document.getElementById('actTitleEdit').value = activity.name;

    document.getElementById('actDescEdit').value = activity.desc;
    document.getElementById('selActCategoryEdit').value = activity.category;
    document.getElementById('actPositionEdit').value = activity.pos;

    document.getElementById('editActModal').classList.remove('fadeIn');
    document.getElementById('editActModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function clickPenTest(t) {
    getTests();

    test = t;

    document.getElementById('selTestSpeciesEdit').value = test.species;
    document.getElementById('testSubSpeciesEdit').value = test.subSpecies;
    document.getElementById('testSpeciesOtherEdit').value = test.speciesOther;
    document.getElementById('testMonthEdit').value = test.month;
    document.getElementById('testYearEdit').value = test.year;
    document.getElementById('testScoreEdit').value = test.score;
    document.getElementById('readingTestScoreEdit').value = test.readScore;
    document.getElementById('mathTestScoreEdit').value = test.mathScore;

    if (document.getElementById('selTestSpeciesEdit').value == 'AP') {
        document.getElementById('testSubSpeciesEdit').classList.remove('hidden');
    } else if (document.getElementById('selTestSpeciesEdit').value == 'SAT' || document.getElementById('selTestSpeciesEdit').value == 'PSAT') {
        document.getElementById('readingTestScoreEdit').classList.remove('hidden');
        document.getElementById('mathTestScoreEdit').classList.remove('hidden');
    } else if (document.getElementById('selTestSpeciesEdit').value == 'Other') {
        document.getElementById('testSpeciesOtherEdit').classList.remove('hidden');
    }

    document.getElementById('editTestModal').classList.remove('fadeIn');
    document.getElementById('editTestModal').classList.add('fadeOut');

    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
}

function clickTrash(el) {
    getCourses();
    getActs();
    getTests();

    if (confirm('Are you sure you want to remove \"' + el.name + '\"?')) {
        el.remove();

        calcListDiff();
        saveLists();
    }
}

function saveCourse() {
    if (course.gradeLevel != document.getElementById('selGradeLevEdit').value) {
        course.gradeLevel = document.getElementById('selGradeLevEdit').value;
        document.getElementById('list' + course.gradeLevel).appendChild(course.cloneNode(true));

        course.remove();
    }

    course.name = document.getElementById('courseTitleEdit').value;
    course.sub = document.getElementById('selSubjectEdit').value;
    course.diff = document.getElementById('selDiffEdit').value;
    course.diff2 = document.getElementById('selDiff2Edit').value;
    course.diffFull = course.diff * course.diff2;

    if (course.sub == 'PE') {
        course.diffFull = course.diffFull * 0.01;
    }

    course.innerHTML = `<i id='${course.id}SbjI'></i>${course.name}<div id='${course.id}Diff'></div>`;

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

    [diffText, diffClass] = getDiff(course.diff);
    document.getElementById(course.id + 'Diff').className = diffClass;
    document.getElementById(course.id + 'Diff').innerText = diffText;

    if (document.getElementById(course.id + 'Diff2') == null || document.getElementById(course.id + 'Diff2') == undefined) {
        div = document.createElement('div');
        div.id = course.id + 'Diff2';
        diff2Class = getDiff2(course.diff2);
        div.className = diff2Class;
        course.appendChild(div);
    } else {
        diff2Class = getDiff2(course.diff2);
        document.getElementById(course.id + 'Diff2').className = diff2Class;
    }

    document.getElementById(course.id + 'SbjI').className = getSubjectIcon(course.sub);
    document.getElementById(course.id + 'SbjI').ariaLabel = course.sub;

    localStorage.setItem(course.id + 'Name', course.name);
    localStorage.setItem(course.id + 'GradeLevel', course.gradeLevel);
    localStorage.setItem(course.id + 'Sub', course.sub);
    localStorage.setItem(course.id + 'Diff', course.diff);
    localStorage.setItem(course.id + 'Diff2', course.diff2);
    localStorage.setItem(course.id + 'DiffFull', course.diffFull);

    saveLists();
    getLists();
    getCourses();
    calcListDiff();

    let pen = document.getElementsByClassName('pen');
    for (i = 0; i < pen.length; i++) {
        pen[i].onclick = function () {
            if (this.parentElement.parentElement.id.startsWith('C')) {
                clickPen(this.parentElement.parentElement);
            } else if (this.parentElement.parentElement.id.startsWith('A')) {
                clickPenAct(this.parentElement.parentElement);
            } else if (this.parentElement.parentElement.id.startsWith('T')) {
                clickPenTest(this.parentElement.parentElement);
            }
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

function saveAct() {
    let descInput = document.getElementById('actDescEdit').value.trim();
    let posInput = document.getElementById('actPositionEdit').value.trim();

    if (descInput.length > 160) {
        alert('Actvity description is too long');
    } else if (posInput.length > 20) {
        alert('Position title is too long');
    } else {
        activity.name = document.getElementById('actTitleEdit').value;
        activity.desc = descInput;
        activity.category = document.getElementById('selActCategoryEdit').value;
        activity.pos = posInput;

        if (activity.desc != '') {
            activity.innerHTML = `<i id='${activity.id}ActI' class='${getActIcon(activity.category)}' aria-label='${activity.category}'></i>${activity.name}<div class='attr actPos' id='${activity.id}Pos'>${activity.pos}</div><h2 class='desc' id='${activity.id}Desc'>${activity.desc}</h2>`;
        } else {
            activity.innerHTML = `<i id='${activity.id}ActI' class='${getActIcon(activity.category)}' aria-label='${activity.category}'></i>${activity.name}<div class='attr actPos' id='${activity.id}Pos'>${activity.pos}</div>`;
        }

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit activity';
        btn.title = 'Edit activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove activity';
        btn.title = 'Remove activity';
        btn.appendChild(icon);
        div.appendChild(btn);

        activity.appendChild(div);

        localStorage.setItem(activity.id + 'Name', activity.name);
        localStorage.setItem(activity.id + 'Desc', activity.desc);
        localStorage.setItem(activity.id + 'Category', activity.category);
        localStorage.setItem(activity.id + 'Pos', activity.pos);

        saveLists();
        getLists();
        getActs();

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
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
}

function saveTest() {
    let monthInput = document.getElementById('testMonthEdit').value.trim();
    let yearInput = document.getElementById('testYearEdit').value.trim();
    let speciesInput = document.getElementById('selTestSpeciesEdit').value.trim();
    let subSpeciesInput = document.getElementById('testSubSpeciesEdit').value.trim();
    let speciesOtherInput = document.getElementById('testSpeciesOtherEdit').value.trim();
    let scoreInput = document.getElementById('testScoreEdit').value.trim();
    let readingScoreInput = document.getElementById('readingTestScoreEdit').value.trim();
    let mathScoreInput = document.getElementById('mathTestScoreEdit').value.trim();

    if (monthInput < 1 || monthInput > 12) {
        alert('Enter a valid month 1-12');
    } else if (yearInput < 1900 || yearInput > currentYear + 10) {
        alert('Enter a valid year');
    } else if (scoreInput < 0 || scoreInput > 9999 || readingScoreInput < 0 || mathScoreInput < 0 || ((speciesInput == 'SAT' || speciesInput == 'PSAT') && (readingScoreInput != '' && mathScoreInput != '' && +readingScoreInput + +mathScoreInput != +scoreInput))) {
        alert('Score not possible');
    } else if (scoreInput == '' || (readingScoreInput == '' && mathScoreInput != '') || (readingScoreInput != '' && mathScoreInput == '')) {
        alert('Enter the test score');
    } else if (subSpeciesInput.length > 30) {
        alert('Subject title is too long');
    } else if (subSpeciesInput == '' && speciesInput == 'AP') {
        alert('Enter the course');
    } else if (speciesOtherInput.length > 30) {
        alert('Test name is too long');
    } else if (speciesOtherInput == '' && speciesInput == 'Other') {
        alert('Enter the test name');
    } else {
        test = document.getElementById(test.id);

        if (monthInput.length == 1) {
            test.month = '0' + monthInput;
        } else {
            test.month = monthInput;
        }
        test.year = yearInput;
        test.score = scoreInput;
        test.readScore = readingScoreInput;
        test.mathScore = mathScoreInput;
        test.species = speciesInput;
        test.subSpecies = subSpeciesInput;
        test.speciesOther = speciesOtherInput;

        test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div>`;
        if (test.species == 'AP') {
            test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} ${test.subSpecies} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div>`;
        } else if (test.species == 'SAT' || test.species == 'PSAT') {
            test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div><div class='testReadScore' id='${test.id}ReadScore'>Reading: ${test.readScore}</div><div class='testMathScore' id='${test.id}MathScore'>Math: ${test.mathScore}</div>`;
            if (readingScoreInput == '' && mathScoreInput == '') {
                test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div>`;
            }
        } else if (test.species == 'Other') {
            test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.speciesOther} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div>`;
        }

        test.name = `${test.species} — ${test.month}/${test.year}`;
        if (test.species == 'AP') {
            test.name = `${test.species} ${test.subSpecies} — ${test.month}/${test.year}`;
        } else if (test.species == 'Other') {
            test.name = `${test.speciesOther} — ${test.month}/${test.year}`;
        }

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit test';
        btn.title = 'Edit test';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove test';
        btn.title = 'Remove test';
        btn.appendChild(icon);
        div.appendChild(btn);

        test.appendChild(div);

        localStorage.setItem(test.id + 'Species', test.species);
        localStorage.setItem(test.id + 'SubSpecies', test.subSpecies);
        localStorage.setItem(test.id + 'SpeciesOther', test.speciesOther);
        localStorage.setItem(test.id + 'Month', test.month);
        localStorage.setItem(test.id + 'Year', test.year);
        localStorage.setItem(test.id + 'Score', test.score);
        localStorage.setItem(test.id + 'ReadingScore', test.readScore);
        localStorage.setItem(test.id + 'MathScore', test.mathScore);
        localStorage.setItem(test.id + 'Name', test.name);

        saveLists();
        getLists();
        getTests();

        let pen = document.getElementsByClassName('pen');
        for (i = 0; i < pen.length; i++) {
            pen[i].onclick = function () {
                if (this.parentElement.parentElement.id.startsWith('C')) {
                    clickPen(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('A')) {
                    clickPenAct(this.parentElement.parentElement);
                } else if (this.parentElement.parentElement.id.startsWith('T')) {
                    clickPenTest(this.parentElement.parentElement);
                }
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
}

function saveCD() {
    gradDay = Number(document.getElementById('gradDay').value);
    gradMonth = Number(document.getElementById('gradMonth').value);
    gradYear = Number(document.getElementById('gradYear').value);
    gradDate = new Date(gradYear, gradMonth - 1, gradDay);

    if (gradDay == '' && gradMonth == '' && gradYear == '') {
        localStorage.setItem('gradDate', gradDate);
        localStorage.setItem('gradDay', gradDay);
        localStorage.setItem('gradMonth', gradMonth);
        localStorage.setItem('gradYear', gradYear);

        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half'></i>`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half'></i>`;

        hide();

    } else if (gradDay < 1 || gradDay > 31) {
        alert('Enter a valid day 1-31');
    } else if (gradMonth < 1 || gradMonth > 12) {
        alert('Enter a valid month 1-12');
    } else if (gradYear > currentYear + 8) {
        alert('Enter a valid year');
    } else if (gradDate < currentDate) {
        alert('Enter a date in the future');
    } else if (gradDay == currentDay && gradMonth == currentMonth && gradYear == currentYear) {
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        hide();
    } else {
        localStorage.setItem('gradDate', gradDate);
        localStorage.setItem('gradDay', gradDay);
        localStorage.setItem('gradMonth', gradMonth);
        localStorage.setItem('gradYear', gradYear);

        let countdown = Math.round(Math.abs((gradDate - currentDate) / oneDay));
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;

        hide();
    }
}

function getCD() {
    gradDay = Number(localStorage.getItem('gradDay', gradDay));
    gradMonth = Number(localStorage.getItem('gradMonth', gradMonth));
    gradYear = Number(localStorage.getItem('gradYear', gradYear));
    gradDate = new Date(localStorage.getItem('gradDate'));

    if (gradDay == currentDay && gradMonth == currentMonth && gradYear == currentYear) {
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i> Happy graduation!`;
        hide();
    } else if (gradDate != NaN && gradDate != null && gradDate > currentDate) {
        let countdown = Math.round(Math.abs((gradDate - currentDate) / oneDay));
        document.getElementById('countdown').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>${countdown} days`;
    } else {
        document.getElementById('countdownSm').innerHTML = `<i class='fa-solid fa-hourglass-half mr-2'></i>Edit countdown`;
    }
}

function getCourses() { // gets all stored info of each course
    for (let i = 9; i <= 13; i++) {
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];
            course.name = localStorage.getItem(course.id + 'Name');
            course.gradeLevel = localStorage.getItem(course.id + 'GradeLevel');
            course.sub = localStorage.getItem(course.id + 'Sub');
            course.diff = localStorage.getItem(course.id + 'Diff');
            course.diff2 = localStorage.getItem(course.id + 'Diff2');
            course.diffFull = localStorage.getItem(course.id + 'DiffFull');

        }
    }
}

function getActs() { // gets all stored info of activities
    let currentItems = document.getElementById('listActs').getElementsByTagName('li');

    for (let j = 0; j < currentItems.length; j++) {
        activity = currentItems[j];
        activity.name = localStorage.getItem(activity.id + 'Name');
        activity.desc = localStorage.getItem(activity.id + 'Desc');
        activity.category = localStorage.getItem(activity.id + 'Category');
        activity.pos = localStorage.getItem(activity.id + 'Pos');
    }
}

function getTests() { // gets all stored info of activities
    let currentItems = document.getElementById('listTests').getElementsByTagName('li');

    for (let j = 0; j < currentItems.length; j++) {
        test = currentItems[j];
        test.species = localStorage.getItem(test.id + 'Species');
        test.subSpecies = localStorage.getItem(test.id + 'SubSpecies');
        test.speciesOther = localStorage.getItem(test.id + 'SpeciesOther');
        test.month = localStorage.getItem(test.id + 'Month');
        test.year = localStorage.getItem(test.id + 'Year');
        test.score = localStorage.getItem(test.id + 'Score');
        test.readScore = localStorage.getItem(test.id + 'ReadingScore');
        test.mathScore = localStorage.getItem(test.id + 'MathScore');
        test.name = localStorage.getItem(test.id + 'Name');
    }
}

function calcListDiff() { // calcs diffs of ALL lists
    for (let i = 9; i <= 13; i++) {
        let sum = 0;
        let currentItems = document.getElementById('list' + i).getElementsByTagName('li');
        let advItems = document.getElementById('list' + i).getElementsByClassName('adv').length
            + document.getElementById('list' + i).getElementsByClassName('hon').length
            + document.getElementById('list' + i).getElementsByClassName('ap').length
            + document.getElementById('list' + i).getElementsByClassName('ib').length;

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];

            if (document.getElementById(course.id + 'Diff').innerText == 'IB') {
                course.diff = 5;
            } else if (document.getElementById(course.id + 'Diff').innerText == 'AP') {
                course.diff = 4;
            } else if (document.getElementById(course.id + 'Diff').innerText == 'Honors') {
                course.diff = 3;
            } else if (document.getElementById(course.id + 'Diff').innerText == 'CP') {
                course.diff = 2.5;
            } else if (document.getElementById(course.id + 'Diff').innerText == 'Advanced') {
                course.diff = 2;
            } else {
                course.diff = 1;
            }

            if (document.getElementById(course.id + 'Diff2') == null || document.getElementById(course.id + 'Diff2') == undefined) {
                div = document.createElement('div');
                div.id = course.id + 'Diff2';
                div.className = 'normal';
                course.appendChild(div);
            }

            if (document.getElementById(course.id + 'Diff2').className == 'challenging') {
                course.diff2 = 3;
            } else if (document.getElementById(course.id + 'Diff2').className == 'difficult') {
                course.diff2 = 2;
            } else if (document.getElementById(course.id + 'Diff2').className == 'easy') {
                course.diff2 = 0.5;
            } else if (document.getElementById(course.id + 'Diff2').className == 'effortless') {
                course.diff2 = 0.25;
            } else {
                course.diff2 = 1;
            }

            course.diffFull = course.diff * course.diff2;

            if (course.sub == 'PE') {
                course.diffFull = course.diffFull * 0.01;
            }

            localStorage.setItem(course.id + 'Diff', course.diff);
            localStorage.setItem(course.id + 'Diff2', course.diff2);
            localStorage.setItem(course.id + 'DiffFull', course.diffFull);

            sum += +course.diffFull;
        }

        let glDiff = ((sum) + (1.175 ** currentItems.length)) / 6;
        localStorage.setItem('list' + i + 'Diff', (Math.round((glDiff) * 100)) / 100);

        // console.table({ list: i, sum: sum, numberItems: currentItems.length });

        if (currentItems.length < 1 || localStorage.getItem('list' + i + 'Diff') <= 0) {
            document.getElementById('diff' + i).innerText = '';
        } else if (localStorage.getItem('list' + i + 'Diff') < 1) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Easy';
            document.getElementById('diff' + i).className = 'attr lev1';
        } else if (localStorage.getItem('list' + i + 'Diff') < 2) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Normal';
            document.getElementById('diff' + i).className = 'attr lev2';
        } else if (localStorage.getItem('list' + i + 'Diff') < 3) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Hard';
            document.getElementById('diff' + i).className = 'attr lev3';
        } else if (localStorage.getItem('list' + i + 'Diff') < 4) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Difficult';
            document.getElementById('diff' + i).className = 'attr lev4';
        } else if (localStorage.getItem('list' + i + 'Diff') < 5) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Challenging';
            document.getElementById('diff' + i).className = 'attr lev5';
        } else if (localStorage.getItem('list' + i + 'Diff') >= 5) {
            document.getElementById('diff' + i).innerText = localStorage.getItem('list' + i + 'Diff') + ' - Extreme';
            document.getElementById('diff' + i).className = 'attr lev6';
        }

        if (advItems > 0) {
            let advPercent = (advItems / currentItems.length) * 100;
            localStorage.setItem('list' + i + 'DiffPercent', Math.round(advPercent));
            document.getElementById('diffPercent' + i).innerText = localStorage.getItem('list' + i + 'DiffPercent') + '%';
            document.getElementById('diffPercent' + i).classList.remove('hidden');
        } else {
            document.getElementById('diffPercent' + i).classList.add('hidden');
        }
    }
}

function updateAllItems() {
    /* for (let i = 9; i <= 13; i++) {
        currentItems = document.getElementById('list' + i).getElementsByTagName('li');

        for (let j = 0; j < currentItems.length; j++) {
            course = currentItems[j];

            if (course.draggable == false) {
                course.draggable = true;
            }
        }
    }
    */

    currentItems = document.getElementById('listActs').getElementsByTagName('li');
    for (let j = 0; j < currentItems.length; j++) {
        activity = currentItems[j];

        /*   2 / 8 / 2023   */

        if (activity.desc == '' && document.getElementById(activity.id + 'Desc')) {
            document.getElementById(activity.id + 'Desc').remove();
        }

        if (document.getElementById(activity.id + 'Desc')) {
            document.getElementById(activity.id + 'Desc').classList.remove('actDesc');
            document.getElementById(activity.id + 'Desc').classList.add('desc');
        }

        /* if (activity.draggable == false) {
            activity.draggable = true;
        } */
    }

    currentItems = document.getElementById('listTests').getElementsByTagName('li');
    for (let j = 0; j < currentItems.length; j++) {
        test = currentItems[j];

        /*   2 / 8 / 2023   */

        test.species = localStorage.getItem(test.id + 'Species');
        test.subSpecies = localStorage.getItem(test.id + 'SubSpecies');
        test.speciesOther = localStorage.getItem(test.id + 'SpeciesOther');
        test.month = localStorage.getItem(test.id + 'Month');
        test.year = localStorage.getItem(test.id + 'Year');

        test.name = `${test.species} — ${test.month}/${test.year}`;
        if (test.species == 'AP') {
            test.name = `${test.species} ${test.subSpecies} — ${test.month}/${test.year}`;
        } else if (test.species == 'Other') {
            test.name = `${test.speciesOther} — ${test.month}/${test.year}`;
        }

        test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div>`;
        if (test.species == 'AP') {
            test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} ${test.subSpecies} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div>`;
        } else if (test.species == 'SAT' || test.species == 'PSAT') {
            test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div><div class='testReadScore' id='${test.id}ReadScore'>Reading: ${test.readScore}</div><div class='testMathScore' id='${test.id}MathScore'>Math: ${test.mathScore}</div>`;
            if (test.readScore == '' && test.mathScore == '') {
                test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.species} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div>`;
            }
        } else if (test.species == 'Other') {
            test.innerHTML = `<i id='${test.id}TestI' aria-label='Test icon' class='testI fa-solid fa-file-lines'></i>${test.speciesOther} — ${test.month}/${test.year}<div class='testScore' id='${test.id}Score'> ${test.score}</div>`;

        }

        div = document.createElement('div');
        div.className = 'optDiv';

        let btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-pen';
        btn.className = 'opt pen';
        btn.ariaLabel = 'Edit test';
        btn.title = 'Edit test';
        btn.appendChild(icon);
        div.appendChild(btn);

        btn = document.createElement('button');
        icon = document.createElement('i');
        icon.className = 'text-lg fa-solid fa-trash';
        btn.className = 'opt trash';
        btn.ariaLabel = 'Remove test';
        btn.title = 'Remove test';
        btn.appendChild(icon);
        div.appendChild(btn);

        test.appendChild(div);

        document.getElementById(test.id + 'Score').classList.remove('attr');
        if (document.getElementById(test.id + 'ReadScore')) {
            document.getElementById(test.id + 'ReadScore').classList.remove('attr');
        }
        if (document.getElementById(test.id + 'MathScore')) {
            document.getElementById(test.id + 'MathScore').classList.remove('attr');
        }

        /* if (test.draggable == false) {
            test.draggable = true;
        } */
    }
}

function saveLists() {
    localStorage.setItem('list9', document.getElementById('list9').innerHTML);
    localStorage.setItem('list10', document.getElementById('list10').innerHTML);
    localStorage.setItem('list11', document.getElementById('list11').innerHTML);
    localStorage.setItem('list12', document.getElementById('list12').innerHTML);
    localStorage.setItem('list13', document.getElementById('list13').innerHTML);
    localStorage.setItem('listActs', document.getElementById('listActs').innerHTML);
    localStorage.setItem('listTests', document.getElementById('listTests').innerHTML);
}

function getLists() {
    document.getElementById('list9').innerHTML = localStorage.getItem('list9');
    document.getElementById('list10').innerHTML = localStorage.getItem('list10');
    document.getElementById('list11').innerHTML = localStorage.getItem('list11');
    document.getElementById('list12').innerHTML = localStorage.getItem('list12');
    document.getElementById('list13').innerHTML = localStorage.getItem('list13');
    document.getElementById('listActs').innerHTML = localStorage.getItem('listActs');
    document.getElementById('listTests').innerHTML = localStorage.getItem('listTests');
}

function getSubjectIcon(sub) {
    if (sub == 'English') {
        return 'sbjI fa-solid fa-pencil';
    } else if (sub == 'History') {
        return 'sbjI fa-solid fa-landmark';
    } else if (sub == 'Math') {
        return 'sbjI fa-solid fa-plus-minus';
    } else if (sub == 'Science') {
        return 'sbjI fa-solid fa-atom';
    } else if (sub == 'Foreign Language') {
        return 'sbjI fa-solid fa-globe';
    } else if (sub == 'Technology') {
        return 'sbjI fa-solid fa-compass-drafting';
    } else if (sub == 'Visual Arts') {
        return 'sbjI fa-solid fa-palette';
    } else if (sub == 'Performing Arts') {
        return 'sbjI fa-solid fa-masks-theater';
    } else if (sub == 'PE') {
        return 'sbjI fa-solid fa-dumbbell';
    } else if (sub == 'Other') {
        return 'sbjI fa-solid fa-graduation-cap';
    }
}

function getActIcon(act) {
    if (act == 'Athletics') {
        return 'actI fa-solid fa-dumbbell';
    } else if (act == 'Club') {
        return 'actI fa-solid fa-puzzle-piece';
    } else if (act == 'Competition') {
        return 'actI fa-solid fa-ranking-star';
    } else if (act == 'Employment') {
        return 'actI fa-solid fa-briefcase';
    } else if (act == 'Event') {
        return 'actI fa-solid fa-calendar-day';
    } else if (act == 'Literature') {
        return 'actI fa-solid fa-pencil';
    } else if (act == 'Math') {
        return 'actI fa-solid fa-plus-minus';
    } else if (act == 'Music') {
        return 'actI fa-solid fa-music';
    } else if (act == 'Science') {
        return 'actI fa-solid fa-atom';
    } else if (act == 'Technology') {
        return 'actI fa-solid fa-compass-drafting';
    } else if (act == 'Visual Arts') {
        return 'actI fa-solid fa-palette';
    } else if (act == 'Performing Arts') {
        return 'actI fa-solid fa-masks-theater';
    } else if (act == 'Volunteering') {
        return 'actI fa-solid fa-hand-holding-hand';
    } else if (act == 'Other') {
        return 'actI fa-solid fa-graduation-cap';
    }
}

function getDiff(diff) {
    if (diff == '5') {
        return ['IB', 'attr ib'];
    } else if (diff == '4') {
        return ['AP', 'attr ap'];
    } else if (diff == '3') {
        return ['Honors', 'attr hon'];
    } else if (diff == '2.5') {
        return ['CP', 'attr cp'];
    } else if (diff == '2') {
        return ['Advanced', 'attr adv'];
    } else {
        return ['', 'attr none'];
    }
}

function getDiff2(diff2) {
    if (diff2 == '3') {
        return 'challenging';
    } else if (diff2 == '2') {
        return 'difficult';
    } else if (diff2 == '0.5') {
        return 'easy';
    } else if (diff2 == '0.25') {
        return 'effortless';
    } else {
        return 'normal';
    }
}

function toggleAdvOptions(n) {
    if (n == 'addC') {
        document.getElementById('advOptionsAddC').classList.toggle('hidden');
        document.getElementById('advOptAddCI').classList.toggle('rotate-90');
    } else if (n == 'editC') {
        document.getElementById('advOptionsEditC').classList.toggle('hidden');
        document.getElementById('advOptEditCI').classList.toggle('rotate-90');
    }
}

/* document.addEventListener('DOMContentLoaded', (event) => {
    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.5';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');

            console.log(dragSrcEl);
            console.log(this);

            let pen = document.getElementsByClassName('pen');
            for (i = 0; i < pen.length; i++) {
                pen[i].onclick = function () {
                    if (this.parentElement.parentElement.id.startsWith('C')) {
                        clickPen(this.parentElement.parentElement);
                    } else if (this.parentElement.parentElement.id.startsWith('A')) {
                        clickPenAct(this.parentElement.parentElement);
                    } else if (this.parentElement.parentElement.id.startsWith('T')) {
                        clickPenTest(this.parentElement.parentElement);
                    }
                }
            }

            let trash = document.getElementsByClassName('trash');
            for (i = 0; i < trash.length; i++) {
                trash[i].onclick = function () {
                    clickTrash(this.parentElement.parentElement);
                }
            }
        }

        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });

        saveLists();
        calcListDiff();
    }

    let items = document.querySelectorAll('.item');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
}); */

window.onclick = function (event) {
    if (event.target == document.getElementById('courseModal')
        || event.target == document.getElementById('editCourseModal')
        || event.target == document.getElementById('actModal')
        || event.target == document.getElementById('editActModal')
        || event.target == document.getElementById('testModal')
        || event.target == document.getElementById('editTestModal')
        || event.target == document.getElementById('diffModal')
        || event.target == document.getElementById('diffPercentModal')
        || event.target == document.getElementById('countdownModal')
        || event.target == document.getElementById('countdownModal')) {
        hide();
    }
}

function hide() {
    document.getElementById('courseModal').classList.add('fadeIn');
    document.getElementById('courseModal').classList.remove('fadeOut');
    document.getElementById('courseTitle').value = '';
    document.getElementById('selSubject').value = 'History';
    document.getElementById('selDiff').value = '1';
    document.getElementById('diffTip').classList.add('hidden');
    document.getElementById('advOptAddCI').classList.remove('rotate-90');
    document.getElementById('advOptionsAddC').classList.add('hidden');
    input.classList.add('mb-4');

    document.getElementById('editCourseModal').classList.add('fadeIn');
    document.getElementById('editCourseModal').classList.remove('fadeOut');
    document.getElementById('diffTipE').classList.add('hidden');
    document.getElementById('advOptEditCI').classList.remove('rotate-90');
    document.getElementById('advOptionsEditC').classList.add('hidden');
    inputE.classList.add('mb-4');

    document.getElementById('actModal').classList.add('fadeIn');
    document.getElementById('actModal').classList.remove('fadeOut');
    document.getElementById('actTitle').value = '';
    document.getElementById('actDesc').value = '';
    document.getElementById('selActCategory').value = 'Athletics';
    document.getElementById('actPosition').value = '';

    document.getElementById('editActModal').classList.add('fadeIn');
    document.getElementById('editActModal').classList.remove('fadeOut');

    document.getElementById('testModal').classList.add('fadeIn');
    document.getElementById('testModal').classList.remove('fadeOut');
    document.getElementById('selTestSpecies').value = 'ACT';
    document.getElementById('testSubSpecies').value = '';
    document.getElementById('testSpeciesOther').value = '';
    document.getElementById('testMonth').value = '';
    document.getElementById('testYear').value = '';
    document.getElementById('testScore').value = '';
    document.getElementById('readingTestScore').value = '';
    document.getElementById('mathTestScore').value = '';
    document.getElementById('testSubSpecies').classList.add('hidden');
    document.getElementById('testSpeciesOther').classList.add('hidden');
    document.getElementById('readingTestScore').classList.add('hidden');
    document.getElementById('mathTestScore').classList.add('hidden');

    document.getElementById('editTestModal').classList.add('fadeIn');
    document.getElementById('editTestModal').classList.remove('fadeOut');
    document.getElementById('testSubSpeciesEdit').value = '';
    document.getElementById('testSpeciesOtherEdit').value = '';
    document.getElementById('readingTestScoreEdit').value = '';
    document.getElementById('mathTestScoreEdit').value = '';
    document.getElementById('testSubSpeciesEdit').classList.add('hidden');
    document.getElementById('testSpeciesOtherEdit').classList.add('hidden');
    document.getElementById('readingTestScoreEdit').classList.add('hidden');
    document.getElementById('mathTestScoreEdit').classList.add('hidden');

    document.getElementById('diffModal').classList.add('fadeIn');
    document.getElementById('diffModal').classList.remove('fadeOut');

    document.getElementById('diffPercentModal').classList.add('fadeIn');
    document.getElementById('diffPercentModal').classList.remove('fadeOut');

    document.getElementById('countdownModal').classList.add('fadeIn');
    document.getElementById('countdownModal').classList.remove('fadeOut');

    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
}