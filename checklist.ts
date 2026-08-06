// CodaKnight's Improved Checklist Extension

//% block="Checklist" weight=75 color=#CC3333 icon="\uf328"
namespace checklist {
    // Interface to store tasks names and completion bool
    interface Task {
        name: string
        completed: boolean
    }

    // Variables
    let tasks: Task[] = []

    let lastCheckedState2: { [key: number]: boolean } = {}; // Stores last known checked states


    let lastCheckedState: { [key: string]: boolean } = {}; // Tracks previous states

    // Constants for positioning
    const boxSize = 8; // Size of the checkbox
    const textWrapWidth = 140
    let selectedItem = 0; // Currently selected task
    let scrollY = 0        // current animated scroll (FLOAT)
    let targetScrollY = 0  // where we want to go
    let checklistVisible = true; // Controls checklist visibility
    let selectionVisible = true
    let autoScroll = true
    let checklistX = 5
    let checklistY = 10

    let checkboxColor = 1
    let highlightColor = 4
    const textOffset = 15

    // Handlers to check for events
    // (e.g., task completes, camera moves, etc.)
    let taskCompletedHandlers: {
        taskName: string,
        handler: () => void
    }[] = []

    let taskUncheckedHandlers: {
        taskName: string,
        handler: () => void
    }[] = []

    let checklistCompletedHandlers: (() => void)[] = []

    let checklistWasComplete = false
    //% block="create check list with list $taskList"
    //% group="Create"
    //% taskList.shadow="lists_create_with" taskList.defl="text"
    export function createChecklist(taskList: string[]) {

        tasks = []

        selectedItem = 0
        scrollY = 0
        targetScrollY = 0

        for (let task of taskList) {
            tasks.push({
                name: task,
                completed: false
            })
        }
    }
    //% block="add task $name"
    //% group="Create"
    export function addTask(name: string) {
        tasks.push({
            name: name,
            completed: false
        })

        ensureSelectionVisible()
    }
    //% block="Hide checklist"
    //%group="Functions"
    export function hideChecklist(): void {
        checklistVisible = false;
    }

    //% block="Show checklist"
    //% group="Functions"
    export function showChecklist(): void {
        checklistVisible = true;
    }


    //% block="did task $taskName just get unchecked?"
    //% group="Functions"
    export function didTaskJustGetUnchecked(taskName: string): boolean {

        for (let task of tasks) {

            if (task.name == taskName) {

                let currentState = task.completed

                if (!currentState && lastCheckedState[taskName]) {
                    lastCheckedState[taskName] = false
                    return true
                }

                if (currentState) {
                    lastCheckedState[taskName] = true
                }

                return false
            }
        }

        return false
    }
    //% block="did task $taskName just get checked?"
    //% group="Functions"
    export function didTaskJustGetChecked(taskName: string): boolean {

        for (let task of tasks) {

            if (task.name == taskName) {

                let currentState = task.completed

                if (currentState && !lastCheckedState[taskName]) {
                    lastCheckedState[taskName] = true
                    return true
                }

                if (!currentState) {
                    lastCheckedState[taskName] = false
                }

                return false
            }
        }

        return false
    }
    //% block="move selection down"
    //% group="Selection"
    export function moveSelectionDown() {
        if (selectedItem < tasks.length - 1) {
            selectedItem++
            ensureSelectionVisible()

        }
    }

    //% block="move selection up"
    //% group="Selection"
    export function moveSelectionUp() {
        if (selectedItem > 0) {
            selectedItem--
            ensureSelectionVisible()
        }
    }

    //% block="scroll to top"
    //% group="Selection"
    export function scrollToTop() {

        if (tasks.length == 0) return;

        selectedItem = 0
        targetScrollY = 0
    }

    //% block="scroll to bottom"
    //% group="Selection"
    export function scrollToBottom() {
        if (tasks.length == 0) return

        selectedItem = tasks.length - 1
        ensureSelectionVisible()
    }

    //% block="complete task $name"
    //% group="Tasks"
    export function completeTask(name: string) {

        for (let task of tasks) {

            if (task.name == name) {

                if (!task.completed) {

                    task.completed = true

                    for (let event of taskCompletedHandlers) {
                        if (event.taskName == name) {
                            event.handler()
                        }
                    }

                    checkChecklistCompleted()
                }

                return
            }
        }
    }
    //% block="uncomplete task $name"
    //% group="Tasks"
    export function uncompleteTask(name: string) {

        for (let task of tasks) {

            if (task.name == name) {

                if (task.completed) {

                    task.completed = false

                    for (let event of taskUncheckedHandlers) {
                        if (event.taskName == name) {
                            event.handler()
                        }
                    }
                    checkChecklistCompleted()
                }

                return
            }
        }
    }
    //% block="toggle selected task"
    //% group="Tasks"
    export function toggleSelectedTask() {
        if (tasks.length > 0) {
            tasks[selectedItem].completed =
                !tasks[selectedItem].completed
        }
    }
    //% block="select task $name"
    //% gropu="Selection"
    export function selectTask(name: string) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].name == name) {
                selectedItem = i
                ensureSelectionVisible()
                return
            }
        }
    }
    //% block="center selection"
    //% group="Selection"
    export function centerSelection() {
        if (tasks.length == 0) return

        const top = getTaskPosition(selectedItem)
        const height = getTaskHeight(selectedItem)

        targetScrollY = top - (screen.height / 2 - height / 2)
    }
    //% block="selected task index"
    //% group="Selection"
    export function selectedTaskIndex(): number {
        return selectedItem + 1
    }


    //% block="toggle task $name"
    //% group="Tasks"
    export function toggleTask(name: string) {
        for (let task of tasks) {
            if (task.name == name) {
                task.completed = !task.completed
                return
            }
        }
    }
    //% block="remove task $name"
    //% group="Tasks"
    export function removeTask(name: string) {
        tasks = tasks.filter(task => task.name != name)
        if (selectedItem >= tasks.length) {
            selectedItem = Math.max(0, tasks.length - 1)
        }


        targetScrollY = getTaskPosition(selectedItem)

    }
    //% block="clear tasks"
    //% group="Tasks"
    export function clearTasks() {
        tasks = []
        selectedItem = 0
        scrollY = 0
        targetScrollY = 0
    }
    //% block="is checklist visible"
    //% group="Visibility"
    export function isVisible(): boolean {
        return checklistVisible
    }
    //% block="toggle checklist"
    //% group="Visibility"
    export function toggleChecklist() {
        checklistVisible = !checklistVisible
    }
    //% block="is task $name completed"
    //% group="Queries"
    export function isTaskCompleted(name: string): boolean {
        for (let task of tasks) {
            if (task.name == name) {
                return task.completed
            }
        }

        return false
    }
    //% block="is selected task completed"
    //% group="Queries"
    export function isSelectedTaskCompleted(): boolean {
        if (tasks.length == 0) return false
        return tasks[selectedItem].completed
    }
    //% block="task count"
    //% group="Queries"
    export function taskCount(): number {
        return tasks.length
    }
    //% block="completed task count"
    //% group="Queries"
    export function completedTaskCount(): number {

        let count = 0

        for (let task of tasks) {
            if (task.completed) {
                count++
            }
        }

        return count
    }
    //% block="is checklist complete"
    //% group="Queries"
    export function isChecklistComplete(): boolean {

        if (tasks.length == 0)
            return false

        for (let task of tasks) {
            if (!task.completed) {
                return false
            }
        }

        return true
    }
    //% block="selected task name"
    //% group="Queries"
    export function selectedTaskName(): string {

        if (tasks.length == 0)
            return ""

        return tasks[selectedItem].name
    }

    //% block="set auto scroll $enabled"
    //% group="Queries"
    //% enabled.shadow="toggleOnOff"
    export function setAutoScroll(enabled: boolean) {
        autoScroll = enabled
    }
    //% block="instant scroll to selected"
    //% group="Queries"
    export function instantScrollToSelected() {
        targetScrollY = getTaskPosition(selectedItem)
        scrollY = targetScrollY
    }
    //% block="set checklist position x $x y $y"
    //% group="Appearance"
    export function setPosition(x: number, y: number) {
        checklistX = x
        checklistY = y
    }
    //% block="show selection"
    //% group="Appearance"
    export function showSelection() {
        selectionVisible = true
    }
    //% block="hide selection"
    //% group="Appearance"
    export function hideSelection() {
        selectionVisible = false
    }
    //% block="set highlight color $color"
    //% color.shadow="colorindexpicker"
    //% group="Appearance"
    export function setHighlightColor(color: number) {
        highlightColor = color
    }

    //% block="on task $taskName completed"
    //% group="Events"
    export function onTaskCompleted(
        taskName: string,
        handler: () => void
    ) {
        taskCompletedHandlers.push({
            taskName: taskName,
            handler: handler
        })
    }
    //% block="on task $taskName unchecked"
    //% group="Events"
    export function onTaskUnchecked(
        taskName: string,
        handler: () => void
    ) {
        taskUncheckedHandlers.push({
            taskName: taskName,
            handler: handler
        })
    }
    //% block="on checklist completed"
    //% group="Events"
    export function onChecklistCompleted(
        handler: () => void
    ) {
        checklistCompletedHandlers.push(handler)
    }
    // helper functions:

    // Function to wrap and draw text
    function wrapAndDrawText(text: string, x: number, y: number, wrapWidth: number): number {
        let words = text.split(" ");
        let currentLine = "";
        let currentY = y;
        const lineHeight = 12;
        let totalHeight = lineHeight;

        for (const word of words) {
            let testLine = currentLine + (currentLine.length > 0 ? " " : "") + word;
            if (testLine.length * 6 > wrapWidth) {
                screen.print(currentLine, x, currentY);
                currentLine = word;
                currentY += lineHeight;
                totalHeight += lineHeight;
            } else {
                currentLine = testLine;
            }
        }
        screen.print(currentLine, x, currentY);
        return totalHeight;
    }
    function ensureSelectionVisible() {
        if (!autoScroll) return
        if (tasks.length == 0) return

        const top = getTaskPosition(selectedItem)
        const bottom = top + getTaskHeight(selectedItem)

        const viewTop = scrollY
        const viewBottom = scrollY + screen.height - 5

        if (top < viewTop) {
            targetScrollY = top
        }

        if (bottom > viewBottom) {
            targetScrollY = bottom - (screen.height - 5)
        }

        if (targetScrollY < 0) targetScrollY = 0
    }

    function drawChecklist(): void {
        let yPosition = checklistY - scrollY

        for (let i = 0; i < tasks.length; i++) {

            const task = tasks[i]

            let taskHeight = getTaskHeight(i)

            if (yPosition > screen.height) {
                break
            }

            screen.drawRect(checklistX, yPosition, boxSize, boxSize, 1)

            if (task.completed) {
                screen.fillRect(
                    checklistX + 2,
                    yPosition + 2,
                    boxSize - 4,
                    boxSize - 4,
                    1
                )
            }

            console.log(
                "i=" + i +
                " selected=" + selectedItem +
                " scroll=" + scrollY +
                " y=" + yPosition
            )

            if (selectionVisible && i === selectedItem) {

                console.log(
                    "*** DRAWING HIGHLIGHT ***" +
                    " i=" + i +
                    " y=" + yPosition
                )

                screen.drawRect(
                    checklistX - 2,
                    yPosition - 2,
                    screen.width - checklistX,
                    taskHeight + 4,
                    highlightColor
                )
            }

            let textHeight =
                wrapAndDrawText(
                    task.name,
                    checklistX + textOffset,
                    yPosition,
                    textWrapWidth
                )


            yPosition += textHeight + 6
        }
    }

    function getTaskHeight(index: number): number {

        let words = tasks[index].name.split(" ")

        let currentLine = ""

        let lines = 1

        const wrapWidth = textWrapWidth

        for (let word of words) {

            let testLine =
                currentLine +
                (currentLine.length > 0 ? " " : "") +
                word

            if (testLine.length * 6 > wrapWidth) {

                lines++

                currentLine = word

            } else {

                currentLine = testLine

            }
        }

        return lines * 12
    }

    // Get the position of a task
    function getTaskPosition(index: number): number {
        let y = checklistY;
        for (let i = 0; i < index; i++) {
            y += getTaskHeight(i) + 6;
        }
        return y;
    }
    function getScrollTargetForIndex(index: number): number {
        return getTaskPosition(index)
    }
    function updateSmoothScroll() {

        // follow target with easing
        let speed = 0.25 // lower = smoother, higher = snappier

        scrollY = scrollY + (targetScrollY - scrollY) * speed
    }
    function checkChecklistCompleted() {

        let complete = isChecklistComplete()

        if (complete && !checklistWasComplete) {

            checklistWasComplete = true

            for (let handler of checklistCompletedHandlers) {
                handler()
            }

        } else if (!complete) {

            checklistWasComplete = false

        }
    }
    //game updates
    game.onPaint(function () {
        if (!checklistVisible) return; // Stop drawing if hidden

        drawChecklist()
    });

    //game.onUpdateInterval(500, function () {
    //console.log("selected=" + selectedItem)
    //console.log("scroll=" + scrollY)
    //})
    game.onUpdate(function () {
        updateSmoothScroll()
    })
}

