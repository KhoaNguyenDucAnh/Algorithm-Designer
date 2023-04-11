var dropPlace = document.querySelector('.chart-section')
var targetList = document.querySelectorAll('.block')
var parentPlace = document.querySelector('.block-bar')
var blockHolder = document.querySelector('.holder')
const inputPopup = document.querySelector('.inputWindow')
const outputPopup = document.querySelector('.outputWindow')
const declarePopup = document.querySelector('.declareWindow')
const assignPopup = document.querySelector('.assignWindow')
const ifPopup = document.querySelector('.ifWindow')
const whilePopup = document.querySelector('.whileWindow')
const forPopup = document.querySelector('.forWindow')
const closePopupButton = document.querySelectorAll('.close-popup')
const runButton = document.querySelector('.run-button')
const runPopup = document.querySelector('.runPopup')
const runCloseButton = document.querySelector('.runCloseButton')
const cppButton = document.querySelector('.cpp')
const cppPopup = document.querySelector('.cppPopup')
const cppCloseButton = document.querySelector('.cppCloseButton')
const saveButton = document.querySelector('.save-button')
const toolBar = document.querySelector('.toolbar')
var body = document

var currentTarget = null
var currentBlock = null
var leftBranch = null
var rightBranch = null
var first = true
var I = false
var inBody = false
var id = 0

var dict = {}

const inputForm = document.querySelector('.inputForm')
const outputForm = document.querySelector('.outputForm')
const declareForm = document.querySelector('.declareForm')
const assignForm = document.querySelector('.assignForm')
const ifForm = document.querySelector('.ifForm')
const whileForm = document.querySelector('.whileForm')
const forForm = document.querySelector('.forForm')
const runForm = document.querySelector('.runForm')

const terminal = document.querySelector('.terminal')

saveButton.addEventListener('click', function(){
    updateDict()
})
  
runButton.addEventListener('click', function(){
    if(window.getComputedStyle(runPopup).getPropertyValue("display") == 'none'){
        updateDict()
        toolBar.style.pointerEvents = 'none'
        runPopup.style.display = 'block'
        var space = document.createElement("div")
        space.classList.add('bigSpace')
        dropPlace.appendChild(space)
    }
    terminal.focus()
})
runCloseButton.addEventListener('click', function(){
    runPopup.style.display = 'none'
    toolBar.style.pointerEvents = 'auto'
    dropPlace.removeChild(dropPlace.lastChild)
    runForm.reset()
})
cppButton.addEventListener('click', function(){
    updateDict()
    cppPopup.style.display = 'block'
})
cppCloseButton.addEventListener('click', function(){
    cppPopup.style.display = 'none'
})

inputForm.addEventListener('submit', function(event){
    event.preventDefault()

    const variableName = document.querySelector('#inputVariable').value
    currentTarget.innerHTML = "Input " + variableName

    currentTarget.setAttribute('name', variableName)

    inputForm.reset()
    inputPopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        inputPopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#inputVariable').value = currentTarget.getAttribute('name')
    })

    updateBranchWidth()
    updateBodyWidth()
})
outputForm.addEventListener('submit', function(event){
    event.preventDefault()

    const outputExpression = document.querySelector('#outputExpression').value

    currentTarget.innerHTML = "Output " + outputExpression

    currentTarget.setAttribute('name', outputExpression)

    outputForm.reset()
    outputPopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        outputPopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#outputExpression').value = currentTarget.getAttribute('name')
    })

    updateBranchWidth()
    updateBodyWidth()
})
declareForm.addEventListener('submit', function(event){
    event.preventDefault()

    const datatypeButtons = document.getElementsByName('datatype')
    const declareVariable = document.querySelector('#declareVariable').value
    var declareDatatype = ''

    for (let i = 0; i < datatypeButtons.length; i++) {
        if (datatypeButtons[i].checked) {
            declareDatatype = datatypeButtons[i].value
            break
        }
    }

    if(declareDatatype == '' || declareVariable.trim() == ''){
        currentTarget.innerHTML = "Declare"
    } else {
        currentTarget.innerHTML = declareDatatype + " " + declareVariable
    }

    currentTarget.setAttribute('type', declareDatatype)
    currentTarget.setAttribute('name', declareVariable)

    declareForm.reset()
    declarePopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        declarePopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#declareVariable').value = currentTarget.getAttribute('name')

        const datatypeButtons = document.getElementsByName('datatype')
        for (let i = 0; i < datatypeButtons.length; i++) {
            if (datatypeButtons[i].value == currentTarget.getAttribute('type')) {
                datatypeButtons[i].checked = true
                break
            }
        }
    })

    updateBranchWidth()
    updateBodyWidth()
})
assignForm.addEventListener('submit', function(event){
    event.preventDefault()

    const assignVariable = document.querySelector('#assignVariable').value
    const assignExpression = document.querySelector('#assignExpression').value

    if(assignVariable.trim() == '' || assignExpression.trim() == ''){
        currentTarget.innerHTML = "Assign"
    } else {
        currentTarget.innerHTML = assignVariable + " = " + assignExpression 
    }

    currentTarget.setAttribute('name', assignVariable)
    currentTarget.setAttribute('value', assignExpression)

    assignForm.reset()
    assignPopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        assignPopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#assignVariable').value = currentTarget.getAttribute('name')
        document.querySelector('#assignExpression').value = currentTarget.getAttribute('value')
    })

    updateBranchWidth()
    updateBodyWidth()
})
ifForm.addEventListener('submit', function(event){
    event.preventDefault()

    const ifExpression = document.querySelector('#ifExpression').value

    if(ifExpression.trim() == ''){
        currentTarget.innerHTML = "If"
    } else {
        currentTarget.innerHTML = ifExpression
    }

    currentTarget.setAttribute('condition', ifExpression)

    ifForm.reset()
    ifPopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        ifPopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#ifExpression').value = currentTarget.getAttribute('condition')
    })

    currentTarget.style.minHeight = (currentTarget.offsetWidth / 135 * 78) + 'px'
    currentTarget.parentNode.style.minHeight = currentTarget.offsetHeight + 'px'
    currentTarget.parentNode.parentNode.previousSibling.childNodes[2].style.minHeight = currentTarget.offsetHeight + 'px'
    currentTarget.parentNode.parentNode.nextSibling.childNodes[2].style.minHeight = currentTarget.offsetHeight + 'px'
    updateBranchWidth()
    updateBodyWidth()
})
whileForm.addEventListener('submit', function(event){
    event.preventDefault()

    const whileExpression = document.querySelector('#whileExpression').value

    if(whileExpression.trim() == ''){
        currentTarget.innerHTML = "While"
    } else {
        currentTarget.innerHTML = whileExpression
    }


    currentTarget.setAttribute('condition', whileExpression)

    whileForm.reset()
    whilePopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        whilePopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#whileExpression').value = currentTarget.getAttribute('condition')
    })

    updateBranchWidth()
    updateBodyWidth()
})
forForm.addEventListener('submit', function(event){
    event.preventDefault()

    const forVariable = document.querySelector('#forVariable').value
    const forDatatypeButtons = document.getElementsByName('forDatatype')
    const forDirectionButtons = document.getElementsByName('forDirection')
    const forStartValue = document.querySelector('#forStartValue').value
    const forEndValue = document.querySelector('#forEndValue').value
    const forStep =  document.querySelector('#forStep').value
    var forDatatype = ''
    var forDirection = ''
    var forCondition = ''
    var forOperator = ''

    for (let i = 0; i < forDatatypeButtons.length; i++) {
        if (forDatatypeButtons[i].checked) {
            forDatatype = forDatatypeButtons[i].value
            break
        }
    }
    for (let i = 0; i < forDirectionButtons.length; i++) {
        if (forDirectionButtons[i].checked) {
            forDirection = forDirectionButtons[i].value
            break
        }
    }

    if(forDirection == "Increasing"){
        forCondition = forVariable + " <= " + forEndValue
        forOperator = "+"
    } else {
        forCondition = forVariable + " >= " + forEndValue
        forOperator = "-"
    }

    if(forVariable.trim() == '' || forStartValue.trim() == '' || forEndValue.trim() == '' || forStep.trim() == '' || forDatatype == '' || forDirection == ''){
        currentTarget.innerHTML = "For"
    } else {
        currentTarget.innerHTML = forVariable + " = " + forStartValue + " to " + forEndValue + " step " + forStep 
    }

    currentTarget.setAttribute(
        'declareStatement',
        JSON.stringify({
            statementType: "Declaration",
            type: forDatatype,
            name: forVariable,
            nextStatement: null
        })
    )
    currentTarget.setAttribute(
        'assignStatement',
        JSON.stringify({
            statementType: "Assignment", 
            name: forVariable,
            value: forStartValue,
            nextStatement: null
        })
    )

    currentTarget.setAttribute('condition', forCondition)

    currentTarget.setAttribute(
        'forLoopStatement',
        JSON.stringify({
            statementType: "Assignment", 
            name: forVariable,
            value: `${forVariable} ${forOperator} ${forStep}`,
            nextStatement: null
        })
    )

    forForm.reset()
    forPopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        forPopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#forVariable').value = JSON.parse(currentTarget.getAttribute('declareStatement'))["name"]
        document.querySelector('#forStartValue').value = JSON.parse(currentTarget.getAttribute('assignStatement'))["value"]
        document.querySelector('#forEndValue').value = currentTarget.getAttribute('condition').split(" ")[2]
        document.querySelector('#forStep').value = JSON.parse(currentTarget.getAttribute('forLoopStatement'))["value"].split(" ")[2]

        const forDatatypeButtons = document.getElementsByName('forDatatype')
        const forDirectionButtons = document.getElementsByName('forDirection')
        const datatype = JSON.parse(currentTarget.getAttribute('declareStatement'))["type"]
        const operator = JSON.parse(currentTarget.getAttribute('forLoopStatement'))["value"].split(" ")[1]
        var direction = "Increasing"
        if(operator == "-"){
            direction = "Decreasing"
        }

        for (let i = 0; i < forDatatypeButtons.length; i++) {
            if (forDatatypeButtons[i].value == datatype) {
                forDatatypeButtons[i].checked = true
                break
            }
        }
        for (let i = 0; i < forDirectionButtons.length; i++) {
            if (forDirectionButtons[i].value == direction) {
                forDirectionButtons[i].checked = true
                break
            }
        }
    })

    updateBranchWidth()
    updateBodyWidth()
})


var closeButtons = Array.from(document.querySelectorAll('.close-popup'))
for(let i=0; i < closeButtons.length; i++){
    var closeButton = closeButtons[i]
    switch(closeButton.parentNode.parentNode.className){
        case "inputWindow popup":
            closeButton.addEventListener('click', () => {
                currentTarget.addEventListener('click', function(){
                    inputPopup.style.display = 'block'
                    currentTarget = this
                })
                inputPopup.style.display = 'none'
                inputForm.reset()
            })
            break
        case"outputWindow popup":
            closeButton.addEventListener('click', () => {   
                currentTarget.addEventListener('click', function(){
                    outputPopup.style.display = 'block'
                    currentTarget = this
                })
                outputPopup.style.display = 'none'
                outputForm.reset()
            })
            break
        case"declareWindow popup":
            closeButton.addEventListener('click', () => {
                currentTarget.addEventListener('click', function(){
                    declarePopup.style.display = 'block'
                    currentTarget = this
                })
                declarePopup.style.display = 'none'
                declareForm.reset()
            })
            break
        case"assignWindow popup":
            closeButton.addEventListener('click', () => {
                currentTarget.addEventListener('click', function(){
                    assignPopup.style.display = 'block'
                    currentTarget = this
                })
                assignPopup.style.display = 'none'
                assignForm.reset()
            })
            break
        case"ifWindow popup":
            closeButton.addEventListener('click', () => {
                currentTarget.addEventListener('click', function(){
                    ifPopup.style.display = 'block'
                    currentTarget = this
                })
                ifPopup.style.display = 'none'
                ifForm.reset()
            })
            break
        case"whileWindow popup":
            closeButton.addEventListener('click', () => {
                currentTarget.addEventListener('click', function(){
                    whilePopup.style.display = 'block'
                    currentTarget = this
                })
                whilePopup.style.display = 'none'
                whileForm.reset()
            })
            break
        case"forWindow popup":
            closeButton.addEventListener('click', () => {
                currentTarget.addEventListener('click', function(){
                    forPopup.style.display = 'block'
                    currentTarget = this
                })
                forPopup.style.display = 'none'
                forForm.reset()
            })
            break
        default:
            console.log('error')
    }
}


function depth(node) {
    let depth = 0;
    while (node.parentNode) {
      depth++;
      node = node.parentNode;
    }
    return depth;
}

function compareDepth(a, b) {
    return depth(b) - depth(a);
}

function iterateNodes(node) {
    // Perform some action on the current node
    if(node.className.includes('block')){
        node.setAttribute('id', id)
        id++
    }
  
    // Recursively call this function for each child node
    const childNodes = node.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        if (childNode.nodeType === Node.ELEMENT_NODE) {
            iterateNodes(childNode);
        }
    }
}
  
function getKeyValue(node) {
    if(node.className.includes('block')){
        var key = node.id
        var value = {}
        switch (node.className) {
            case "input parallelogram block":
                value["statementType"] = "Input"
                var nextNode = node.parentNode.nextSibling.nextSibling
                if(nextNode === null){
                    value["nextStatement"] = null
                } else if(nextNode.nextSibling.className == "oval end block"){
                    value["nextStatement"] = nextNode.nextSibling.id
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else if(nextNode.firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["nextStatement"] = nextID
                } 

                var inputVariable = node.getAttribute('name')
                if(inputVariable === null){
                    inputVariable = ''
                }
                value["name"] = inputVariable

                break
            case "output parallelogram block":
                value["statementType"] = "Output"
                var nextNode = node.parentNode.nextSibling.nextSibling
                if(nextNode === null){
                    value["nextStatement"] = null
                } else if(nextNode.nextSibling.className == "oval end block"){
                    value["nextStatement"] = nextNode.nextSibling.id
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else if(nextNode.firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["nextStatement"] = nextID
                } 

                var outputExpression = node.getAttribute('name')
                if(outputExpression === null){
                    outputExpression = ''
                }
                value["value"] = outputExpression

                break
            case "declare rectangle block":
                value["statementType"] = "Declaration"
                var nextNode = node.parentNode.nextSibling.nextSibling
                if(nextNode === null || nextNode.id === undefined){
                    if(nextNode.nextSibling.className == "oval end block"){
                        value["nextStatement"] = nextNode.nextSibling.id
                    } else {
                        value["nextStatement"] = null
                    }
                } else {
                    if(nextNode.className == "oval end block"){
                        var nextID = nextNode.id
                    } else if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else if(nextNode.firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["nextStatement"] = nextID
                } 
                
                var declareDatatype = node.getAttribute('type')
                var declareVariable = node.getAttribute('name')
                if(declareDatatype === null){
                    declareDatatype = ''
                }
                if(declareVariable === null){
                    declareVariable = ''
                }
                value["type"] = declareDatatype
                value["name"] = declareVariable
                
                break
            case "assign rectangle block":
                value["statementType"] = "Assignment"
                var nextNode = node.parentNode.nextSibling.nextSibling
                if(nextNode === null){
                    value["nextStatement"] = null
                } else if(nextNode.nextSibling.className == "oval end block"){
                    value["nextStatement"] = nextNode.nextSibling.id
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else if(nextNode.firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["nextStatement"] = nextID
                } 

                var assignVariable = node.getAttribute('name')
                var assignExpression = node.getAttribute('value')
                if(assignVariable === null){
                    assignVariable = ''
                }
                if(assignExpression === null){
                    assignExpression = ''
                }
                value["name"] = assignVariable
                value["value"] = assignExpression

                break
            case "rhombus block":
                value["statementType"] = "Conditional"
                var nextNode = node.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling
                if(nextNode === null){
                    value["nextStatement"] = null
                } else if(nextNode.nextSibling.className == "oval end block"){
                    value["nextStatement"] = nextNode.nextSibling.id
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else if(nextNode.firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["nextStatement"] = nextID
                } 
                var trueNode = node.parentNode.parentNode.previousSibling.childNodes[1]
                var falseNode = node.parentNode.parentNode.nextSibling.childNodes[1]
                if(trueNode.childNodes[1] === undefined){
                    value["trueStatement"] = null
                } else {
                    if(trueNode.childNodes[1].firstChild.className.includes('block')){
                        var nextID = trueNode.childNodes[1].firstChild.id
                    } else if(trueNode.childNodes[1].firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = trueNode.childNodes[1].firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = trueNode.childNodes[1].firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["trueStatement"] = nextID
                } 
                if(falseNode.childNodes[1] === undefined){
                    value["falseStatement"] = null
                } else {
                    if(falseNode.childNodes[1].firstChild.className.includes('block')){
                        var nextID = falseNode.childNodes[1].firstChild.id
                    } else if(falseNode.childNodes[1].firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = falseNode.childNodes[1].firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = falseNode.childNodes[1].firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["falseStatement"] = nextID
                } 

                var ifCondition = node.getAttribute('condition')
                if(ifCondition === null){
                    ifCondition = ''
                }
                value["condition"] = ifCondition

                break
            case "while hexagon block":
                value["statementType"] = "WhileLoop"
                var nextNode = node.parentNode.parentNode.parentNode.nextSibling.nextSibling
                if(nextNode === null){
                    value["nextStatement"] = null
                } else if(nextNode.nextSibling.className == "oval end block"){
                    value["nextStatement"] = nextNode.nextSibling.id
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else if(nextNode.firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["nextStatement"] = nextID
                } 
                var loopBody = node.parentNode.nextSibling.childNodes[1]
                if(loopBody.childNodes[1] === undefined){
                    value["loopStatement"] = null
                } else {
                    if(loopBody.childNodes[1].firstChild.className.includes('block')){
                        var nextID = loopBody.childNodes[1].firstChild.id
                    } else if(loopBody.childNodes[1].firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = loopBody.childNodes[1].firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = loopBody.childNodes[1].firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["loopStatement"] = nextID
                } 

                var whileCondition = node.getAttribute('condition')
                if(whileCondition === null){
                    whileCondition = ''
                }
                value["condition"] = whileCondition

                break
            case "for hexagon block":
                value["statementType"] = "ForLoop"
                var nextNode = node.parentNode.parentNode.parentNode.nextSibling.nextSibling
                if(nextNode === null){
                    value["nextStatement"] = null
                } else if(nextNode.nextSibling.className == "oval end block"){
                    value["nextStatement"] = nextNode.nextSibling.id
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else if(nextNode.firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["nextStatement"] = nextID
                } 
                var loopBody = node.parentNode.nextSibling.childNodes[1]
                if(loopBody.childNodes[1] === undefined){
                    value["loopStatement"] = null
                } else {
                    if(loopBody.childNodes[1].firstChild.className.includes('block')){
                        var nextID = loopBody.childNodes[1].firstChild.id
                    } else if(loopBody.childNodes[1].firstChild.childNodes[1].firstChild.className.includes('block')){
                        var nextID = loopBody.childNodes[1].firstChild.childNodes[1].firstChild.id
                    } else {
                        var nextID = loopBody.childNodes[1].firstChild.childNodes[1].childNodes[2].firstChild.id
                    }
                    value["loopStatement"] = nextID
                } 

                const declareStatement = JSON.parse(node.getAttribute('declareStatement'))
                const assignStatement = JSON.parse(node.getAttribute('assignStatement'))
                const forCondition = node.getAttribute('condition')
                const forLoopStatement = JSON.parse(node.getAttribute('forLoopStatement'))
                value["declareStatement"] = declareStatement
                value["assignStatement"] = assignStatement
                value["condition"] = forCondition
                value["forLoopStatement"] = forLoopStatement

                break
            case "oval begin block":
                value["statementType"] = "Begin"
                var nextNode = node.nextSibling.nextSibling.nextSibling
                if(nextNode.nextSibling.className == "oval end block"){
                    var nextID = nextNode.nextSibling.id
                } else if(nextNode.firstChild.className.includes('block')){
                    var nextID = nextNode.firstChild.id
                } else if(nextNode.firstChild.childNodes[1].firstChild.className.includes('block')){
                    var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                } else {
                    var nextID = nextNode.firstChild.childNodes[1].childNodes[2].firstChild.id
                }
                value["nextStatement"] = nextID
                break
            case "oval end block":
                value["statementType"] = "End"
                value["nextStatement"] = null
                break
            default:
                console.log('error');
        }
        dict[key] = value
    }
  
    // Recursively call this function for each child node
    const childNodes = node.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        if (childNode.nodeType === Node.ELEMENT_NODE) {
            getKeyValue(childNode);
        }
    }
}

function updateDict(){
    dict = {}
    id = 0
    iterateNodes(dropPlace)
    getKeyValue(dropPlace)
    return dict
}

function updateBranchWidth(){
    var nodes = Array.from(document.querySelectorAll('.rhombus, .hexagon'));
    nodes.sort(compareDepth);
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if(node.parentNode != parentPlace && !node.parentNode.className.includes("blockDescription")){
            if(node.className.includes('rhombus')){
                var leftBranch = node.parentNode.parentNode.previousSibling.childNodes[1]
                var rightBranch = node.parentNode.parentNode.nextSibling.childNodes[1]
                var leftWidth = 0
                var rightWidth = 0
                for(let i=0; i < leftBranch.childNodes.length; i++){
                    leftWidth = Math.max(leftWidth, leftBranch.childNodes[i].scrollWidth)
                }
                for(let i=0; i < rightBranch.childNodes.length; i++){
                    rightWidth = Math.max(rightWidth, rightBranch.childNodes[i].scrollWidth)
                }
                var maxWidth = Math.max(leftWidth, rightWidth)
                leftBranch.style.minWidth = maxWidth + 'px'
                rightBranch.style.minWidth = maxWidth + 'px'
            } else {
                var leftBranch = node.parentNode.previousSibling
                var rightBranch = node.parentNode.nextSibling.childNodes[1]
                var rightWidth = 0
                for(let i=0; i < rightBranch.childNodes.length; i++){
                    rightWidth = Math.max(rightWidth, rightBranch.childNodes[i].scrollWidth)
                }
                leftBranch.style.minWidth = rightWidth + 'px'
                rightBranch.style.minWidth = rightWidth + 'px'
            }
        }
    }
}

function updateBodyWidth(){
    var bodyWidth = 0
    for(let i=0; i < dropPlace.childNodes.length; i++){
        if(dropPlace.childNodes[i].scrollWidth != undefined){
            bodyWidth = Math.max(bodyWidth, dropPlace.childNodes[i].scrollWidth)
        }
    }
    dropPlace.style.minWidth = bodyWidth + 'px'
}

function addBackground(node){
    var verticalJoint = document.createElement("div")
    var roundJoint = document.createElement("div")
    verticalJoint.classList.add("verticalJoint")
    roundJoint.classList.add("roundJoint")
    verticalJoint.style.height = '100%'
    verticalJoint.style.zIndex = '0'
    roundJoint.style.zIndex = '1'
    node.appendChild(verticalJoint)
    node.appendChild(roundJoint)
}

function addEventListener(node) {
    const dropFunction = function(){
        if(I && node.getAttribute('full') === null){
            inBody = true
            node.setAttribute('full', true)
            node.style.background = 'transparent'
            currentTarget.style.margin = '0'
            if(currentTarget.className == "rhombus block"){
                var aboveBlock = document.createElement("div")
                var leftCondition = document.createElement("div")
                var rightCondition = document.createElement("div")
                var leftBlock = document.createElement("div")
                var rightBlock = document.createElement("div")
                var bottomBlock = document.createElement("div")
                var ifStatement = document.createElement("div")
                
                var one = document.createElement("div")
                var two = document.createElement("div")
                var three = document.createElement("div")
                var five = document.createElement("div")
                var seven = document.createElement("div")
                var eight = document.createElement("div")
                var nine = document.createElement("div")

                var left = document.createElement("div")
                var middle = document.createElement("div")
                var right = document.createElement("div")

                var verticalJoint1 = document.createElement("div")
                var verticalJoint2 = document.createElement("div")
                var verticalJoint3 = document.createElement("div")
                var verticalJoint4 = document.createElement("div")
                var verticalJoint5 = document.createElement("div")
                var verticalJoint6 = document.createElement("div")
                var horizontalJoint1 = document.createElement("div")
                var horizontalJoint2 = document.createElement("div")
                var horizontalJoint3 = document.createElement("div")
                var horizontalJoint4 = document.createElement("div")
                var horizontalJoint5 = document.createElement("div")
                var horizontalJoint6 = document.createElement("div")

                var trueLabel = document.createElement("label")
                var falseLabel = document.createElement("label")

                trueLabel.innerText = "True"
                falseLabel.innerText = "False"

                trueLabel.classList.add("trueLabel")
                falseLabel.classList.add("falseLabel")

                addEventListener(rightBlock)
                addEventListener(leftBlock)
                addEventListener(bottomBlock)
                addEventListener(aboveBlock)
                addBackground(rightBlock)
                addBackground(leftBlock)
                addBackground(bottomBlock)
                addBackground(aboveBlock)

                leftBlock.style.flex = '1'
                rightBlock.style.flex = '1'
                aboveBlock.style.flex = '1'
                bottomBlock.style.flex = '1'

                leftCondition.classList.add("codeBlock")
                rightCondition.classList.add("codeBlock")
                aboveBlock.classList.add("holder")
                leftBlock.classList.add("holder")
                rightBlock.classList.add("holder")
                bottomBlock.classList.add("holder")
                ifStatement.classList.add("branch-statement")
                
                left.classList.add("column")
                middle.classList.add("column")
                right.classList.add("column")
                
                one.classList.add("space")
                one.classList.add("one")
                two.classList.add("space")
                two.classList.add("two")
                three.classList.add("space")
                three.classList.add("three")
                five.classList.add("space")
                five.classList.add("five")
                seven.classList.add("space")
                seven.classList.add("seven")
                eight.classList.add("space")
                nine.classList.add("space")
                nine.classList.add("nine")

                verticalJoint1.classList.add("verticalJoint")
                verticalJoint2.classList.add("verticalJoint")
                verticalJoint3.classList.add("verticalJoint")
                verticalJoint4.classList.add("verticalJoint")
                verticalJoint5.classList.add("verticalJoint")
                verticalJoint6.classList.add("verticalJoint")
                horizontalJoint1.classList.add("horizontalJoint")
                horizontalJoint2.classList.add("horizontalJoint")
                horizontalJoint3.classList.add("horizontalJoint")
                horizontalJoint4.classList.add("horizontalJoint")
                horizontalJoint5.classList.add("horizontalJoint")
                horizontalJoint6.classList.add("horizontalJoint")

                leftCondition.appendChild(leftBlock)
                rightCondition.appendChild(rightBlock)

                verticalJoint2.style.top = '0'
                seven.appendChild(horizontalJoint1)
                seven.appendChild(verticalJoint1)
                seven.appendChild(trueLabel)
                one.appendChild(horizontalJoint2)
                one.appendChild(verticalJoint2)
                left.appendChild(one)
                left.appendChild(leftCondition)
                left.appendChild(seven)
                left.style.alignSelf="stretch"

                horizontalJoint5.style.width = '100%'
                verticalJoint6.style.top = '0'
                verticalJoint6.style.zIndex = '0'
                horizontalJoint6.style.width = '100%'
                horizontalJoint6.style.zIndex = '0'
                currentTarget.style.zIndex = '1'
                two.appendChild(currentTarget)
                two.appendChild(horizontalJoint6)
                two.appendChild(verticalJoint6)
                five.appendChild(horizontalJoint5)
                five.appendChild(verticalJoint5)
                middle.appendChild(five)
                middle.appendChild(eight)
                middle.appendChild(two)
                middle.style.alignSelf="stretch"

                horizontalJoint4.style.left = '0'
                verticalJoint3.style.top = '0'
                horizontalJoint3.style.left = '0'
                three.appendChild(horizontalJoint3)
                three.appendChild(verticalJoint3)
                nine.appendChild(horizontalJoint4)
                nine.appendChild(verticalJoint4)
                nine.appendChild(falseLabel)
                right.appendChild(three)
                right.appendChild(rightCondition)
                right.appendChild(nine)
                right.style.alignSelf="stretch"

                ifStatement.appendChild(left)
                ifStatement.appendChild(middle)
                ifStatement.appendChild(right)

                node.parentNode.insertBefore(bottomBlock, this.nextSibling)
                node.parentNode.insertBefore(aboveBlock, this)
                node.appendChild(ifStatement)
                
                currentTarget.parentNode.style.minHeight = currentTarget.offsetHeight + 'px'
                currentTarget.parentNode.parentNode.previousSibling.childNodes[2].style.minHeight = currentTarget.offsetHeight + 'px'
                currentTarget.parentNode.parentNode.nextSibling.childNodes[2].style.minHeight = currentTarget.offsetHeight + 'px'

                currentTarget.style.minWidth = '150px'
                currentTarget.style.minHeight = currentTarget.offsetWidth / 150 * 86 + 'px'
                currentTarget.style.fontSize = '100%'

                const childNodes = node.childNodes;
                for (let i = childNodes.length - 2; i >= 0; i--) {
                    node.removeChild(childNodes[i]);
                }
            }
            else if(currentTarget.className.includes("hexagon")){

                var aboveBlock = document.createElement("div")
                var bottomBlock = document.createElement("div")
                var loopBody = document.createElement("div")
                var loopBlock = document.createElement("div")
                var loop = document.createElement("div")

                var two = document.createElement("div")
                var three = document.createElement("div")
                var five = document.createElement("div")
                var six = document.createElement("div")

                var left = document.createElement("div")
                var middle = document.createElement("div")
                var right = document.createElement("div")
                
                var verticalJoint1 = document.createElement("div")
                var verticalJoint2 = document.createElement("div")
                var verticalJoint3 = document.createElement("div")
                var verticalJoint4 = document.createElement("div")
                var verticalJoint5 = document.createElement("div")
                var verticalJoint6 = document.createElement("div")
                var horizontalJoint1 = document.createElement("div")
                var horizontalJoint2 = document.createElement("div")
                var horizontalJoint3 = document.createElement("div")
                
                addEventListener(aboveBlock)
                addEventListener(bottomBlock)
                addEventListener(loopBlock)
                addBackground(aboveBlock)
                addBackground(bottomBlock)
                addBackground(loopBlock)

                loopBlock.style.flex = '1'
                aboveBlock.style.flex = '1'
                bottomBlock.style.flex = '1'

                aboveBlock.classList.add("holder")
                bottomBlock.classList.add("holder")
                loopBlock.classList.add("holder")
                loopBody.classList.add("codeBlock")
                loop.classList.add("branch-statement")

                left.classList.add("column")
                middle.classList.add("column")
                right.classList.add("column")

                two.classList.add("space")
                three.classList.add("space")
                five.classList.add("space")
                six.classList.add("space")

                verticalJoint1.classList.add("verticalJoint")
                verticalJoint2.classList.add("verticalJoint")
                verticalJoint3.classList.add("verticalJoint")
                verticalJoint4.classList.add("verticalJoint")
                verticalJoint5.classList.add("verticalJoint")
                verticalJoint6.classList.add("verticalJoint")
                horizontalJoint1.classList.add("horizontalJoint")
                horizontalJoint2.classList.add("horizontalJoint")
                horizontalJoint3.classList.add("horizontalJoint")

                loopBody.appendChild(loopBlock)

                left.style.minWidth = '50px'
                
                horizontalJoint3.style.width = 'calc(50% - 25px)'
                verticalJoint3.style.height = '100%'
                verticalJoint4.style.height = '100%'
                verticalJoint5.style.right = 'calc(50% - 29px)'
                verticalJoint5.style.top = '0'
                verticalJoint6.style.right = 'calc(50% - 29px)'
                verticalJoint6.style.height = '100%'
                three.appendChild(horizontalJoint3)
                three.appendChild(verticalJoint3)
                three.appendChild(verticalJoint5)
                five.appendChild(verticalJoint4)
                five.appendChild(verticalJoint6)
                middle.appendChild(currentTarget)
                middle.appendChild(three)
                middle.appendChild(five)
                middle.style.alignSelf="stretch"
                three.style.maxHeight = '50px'
                three.style.alignSelf = 'stretch'
                five.style.alignSelf = 'stretch'

                horizontalJoint1.style.left = '0'
                horizontalJoint2.style.left = '0'
                verticalJoint2.style.top = '0'
                six.appendChild(horizontalJoint1)
                six.appendChild(verticalJoint1)
                two.appendChild(horizontalJoint2)
                two.appendChild(verticalJoint2)
                right.appendChild(two)
                right.appendChild(loopBody)
                right.appendChild(six)
                six.style.minHeight = '50px'
                six.style.alignSelf = 'stretch'
                two.style.alignSelf = 'stretch'

                loop.appendChild(left)
                loop.appendChild(middle)
                loop.appendChild(right)

                node.parentNode.insertBefore(bottomBlock, this.nextSibling)
                node.parentNode.insertBefore(aboveBlock, this)
                node.appendChild(loop)
                
                currentTarget.style.minHeight = '50px'
                currentTarget.style.minWidth = '150px'
                currentTarget.style.fontSize = '100%'

                const childNodes = node.childNodes;
                for (let i = childNodes.length - 2; i >= 0; i--) {
                    node.removeChild(childNodes[i]);
                }
            }
            else
            {
                // node.childNodes[2].remove()
                var aboveBlock = document.createElement("div")
                var belowBlock = document.createElement("div")
                addEventListener(aboveBlock)
                addEventListener(belowBlock)
                aboveBlock.classList.add("holder")
                belowBlock.classList.add("holder")
                addBackground(aboveBlock)
                addBackground(belowBlock)
                aboveBlock.style.flex = '1'
                belowBlock.style.flex = '1'
                node.parentNode.insertBefore(aboveBlock, this)
                node.parentNode.insertBefore(belowBlock, this.nextSibling)

                currentTarget.style.minHeight = '50px'
                currentTarget.style.minWidth = '135px'
                currentTarget.style.fontSize = '100%'
            }
            node.style.flex = ''
            if(currentBlock == parentPlace){
                switch (currentTarget.className) {
                    case "input parallelogram block":
                        inputPopup.style.display = 'block'
                        break
                    case "output parallelogram block":
                        outputPopup.style.display = 'block'
                        break
                    case "declare rectangle block":
                        declarePopup.style.display = 'block'
                        break
                    case "assign rectangle block":
                        assignPopup.style.display = 'block'
                        break
                    case "rhombus block":
                        ifPopup.style.display = 'block'
                        break
                    case "while hexagon block":
                        whilePopup.style.display = 'block'
                        break
                    case "for hexagon block":
                        forPopup.style.display = 'block'
                        break
                    default:
                        console.log('error');
                }
                currentTarget.innerHTML = ""
            }
            if(currentBlock != parentPlace){
                if(currentTarget.className == "rhombus block"){
                    currentBlock.parentNode.parentNode.parentNode.nextSibling.remove()
                    currentBlock.parentNode.parentNode.parentNode.remove()
                } else if(currentTarget.className.includes("hexagon")){
                    currentBlock.parentNode.parentNode.nextSibling.remove()
                    currentBlock.parentNode.parentNode.remove()
                } else {
                    currentBlock.nextSibling.remove()
                    currentBlock.remove()
                }
            }
            updateBranchWidth()
            updateBodyWidth()
            I = false
        }
    }
    node.addEventListener('dragover', function(e){
        e.preventDefault()
        if(node.childNodes[0].className != "branch-statement" && node.getAttribute('full') === null){
            if(currentBlock != parentPlace){
                if(currentTarget.className == "rhombus block"){
                    if(leftBranch.contains(node)){
                        return
                    }
                    if(rightBranch.contains(node)){
                        return
                    }
                }
                if(currentTarget.className.includes("hexagon")){
                    if(rightBranch.contains(node)){
                        return
                    }
                }
            }
            I = true
            node.insertBefore(currentTarget, node.firstChild)
            currentTarget.style.zIndex = '2'
            if(first){
                var cloneShape = currentTarget.cloneNode(true)
                cloneShape.addEventListener('dragstart', function(e){
                    inBody = false 
                    currentTarget = this
                    currentBlock = this.parentNode
                    if(currentTarget.className == "rhombus block" && currentTarget.parentNode != parentPlace){
                        leftBranch = currentTarget.parentNode.parentNode.previousSibling.childNodes[1]
                        rightBranch = currentTarget.parentNode.parentNode.nextSibling.childNodes[1]
                    } else if(currentTarget.className.includes("hexagon") && currentTarget.parentNode != parentPlace){
                        rightBranch = currentTarget.parentNode.nextSibling.childNodes[1]
                    }
                    if(parentPlace.contains(currentTarget)){
                        first = true
                    }
                })
                parentPlace.appendChild(cloneShape)
                first = false
            }
        }
    })
    node.addEventListener('drop', dropFunction)
}

addBackground(blockHolder)

const holders = document.querySelectorAll('.holder');
for (let i = 0; i < holders.length; i++) {
  const holder = holders[i];
  addEventListener(holder)
}

const blockNodes = document.querySelectorAll('[class*="block"]');
blockNodes.forEach(node => {
    if(!node.className.includes('oval') && !node.className.includes('display') && node.parentNode != parentPlace){
        switch (node.className) {
            case "input parallelogram block":
                node.addEventListener('click', function(){
                    inputPopup.style.display = 'block'
                    currentTarget = this
                    document.querySelector('#inputVariable').value = currentTarget.getAttribute('name')
                })
                break
            case "output parallelogram block":
                node.addEventListener('click', function(){
                    outputPopup.style.display = 'block'
                    currentTarget = this
                    document.querySelector('#outputExpression').value = currentTarget.getAttribute('name')
                })
                break
            case "declare rectangle block":
                node.addEventListener('click', function(){
                    declarePopup.style.display = 'block'
                    currentTarget = this
                    document.querySelector('#declareVariable').value = currentTarget.getAttribute('name')
            
                    const datatypeButtons = document.getElementsByName('datatype')
                    for (let i = 0; i < datatypeButtons.length; i++) {
                        if (datatypeButtons[i].value == currentTarget.getAttribute('type')) {
                            datatypeButtons[i].checked = true
                            break
                        }
                    }
                })
                break
            case "assign rectangle block":
                node.addEventListener('click', function(){
                    assignPopup.style.display = 'block'
                    currentTarget = this
                    document.querySelector('#assignVariable').value = currentTarget.getAttribute('name')
                    document.querySelector('#assignExpression').value = currentTarget.getAttribute('value')
                })
                break
            case "rhombus block":
                node.addEventListener('click', function(){
                    ifPopup.style.display = 'block'
                    currentTarget = this
                    document.querySelector('#ifExpression').value = currentTarget.getAttribute('condition')
                })
                break
            case "while hexagon block":
                node.addEventListener('click', function(){
                    whilePopup.style.display = 'block'
                    currentTarget = this
                    document.querySelector('#whileExpression').value = currentTarget.getAttribute('condition')
                })
                break
            case "for hexagon block":
                node.addEventListener('click', function(){
                    forPopup.style.display = 'block'
                    currentTarget = this
                    document.querySelector('#forVariable').value = JSON.parse(currentTarget.getAttribute('declareStatement'))["name"]
                    document.querySelector('#forStartValue').value = JSON.parse(currentTarget.getAttribute('assignStatement'))["value"]
                    document.querySelector('#forEndValue').value = currentTarget.getAttribute('condition').split(" ")[2]
                    document.querySelector('#forStep').value = JSON.parse(currentTarget.getAttribute('forLoopStatement'))["value"].split(" ")[2]
            
                    const forDatatypeButtons = document.getElementsByName('forDatatype')
                    const forDirectionButtons = document.getElementsByName('forDirection')
                    const datatype = JSON.parse(currentTarget.getAttribute('declareStatement'))["type"]
                    const operator = JSON.parse(currentTarget.getAttribute('forLoopStatement'))["value"].split(" ")[1]
                    var direction = "Increasing"
                    if(operator == "-"){
                        direction = "Decreasing"
                    }
            
                    for (let i = 0; i < forDatatypeButtons.length; i++) {
                        if (forDatatypeButtons[i].value == datatype) {
                            forDatatypeButtons[i].checked = true
                            break
                        }
                    }
                    for (let i = 0; i < forDirectionButtons.length; i++) {
                        if (forDirectionButtons[i].value == direction) {
                            forDirectionButtons[i].checked = true
                            break
                        }
                    }
                })
                break
            default:
        }
    }
});
  
body.addEventListener('dragover', function(e){
    e.preventDefault()
})
body.addEventListener('drop', function(e){
    if(I && !inBody){
        if(currentBlock == parentPlace){
            currentTarget.remove()
        } else {
            currentBlock.appendChild(currentTarget)
        }
        I = false
    }
})

targetList.forEach(target => {
    target.addEventListener('dragstart', function(e){
        inBody = false 
        currentTarget = this
        currentBlock = this.parentNode
        if(currentTarget.className == "rhombus block" && currentTarget.parentNode != parentPlace){
            leftBranch = currentTarget.parentNode.parentNode.previousSibling.childNodes[1]
            rightBranch = currentTarget.parentNode.parentNode.nextSibling.childNodes[1]
        } else if(currentTarget.className.includes("hexagon") && currentTarget.parentNode != parentPlace){
            rightBranch = currentTarget.parentNode.nextSibling.childNodes[1]
        }
        if(parentPlace.contains(currentTarget)){
            first = true
        }
    })
})
parentPlace.addEventListener('dragover', function(e){
    e.preventDefault()
})
parentPlace.addEventListener('drop', function(e){
    if(!parentPlace.contains(currentTarget)){
        if(currentBlock != parentPlace){
            if(currentTarget.className.includes('hexagon')){
                currentBlock.parentNode.parentNode.nextSibling.remove()
                currentBlock.parentNode.parentNode.remove()
            }
            else if(currentTarget.className == "rhombus block"){
                currentBlock.parentNode.parentNode.parentNode.nextSibling.remove()
                currentBlock.parentNode.parentNode.parentNode.remove()
            }
            else{
                currentBlock.nextSibling.remove()
                currentBlock.remove()
            }
        }
        currentTarget.remove()
        updateBranchWidth()
        updateBodyWidth()
    }
})

updateDict()

function run() {
    dict = updateDict()
    fetch("/api/v1/algorithms/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dict)
    })
    .then(function(response) {
        console.log(response);
        if (response.ok) {
            const sse = new EventSource("/api/v1/algorithms/run");
            let getId = true;
            let id = null;

            sse.onmessage = function(message) {
                if (getId) {
                    id = message.data;
                    getId = false;
                }
                else if (message.data == id) {
                    sse.close();
                }
                else {
                    console.log(message.data);
                }
            };
        }
    });
}

function generate() {
    dict = updateDict()
    console.log(dict)
    fetch(url + "generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dict)
    })
    .then(function(response) {
        if (!response.ok) {
            
        }
        return response.json();
    })
    .then(function(data) {
        return;
    });
}