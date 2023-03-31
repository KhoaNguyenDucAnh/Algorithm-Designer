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
var body = document

var currentTarget = null
var currentBlock = null
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
    updateDict()
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
    updateDict()
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

    currentTarget.innerHTML = declareDatatype + " " + declareVariable

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
    updateDict()
    updateBodyWidth()
})
assignForm.addEventListener('submit', function(event){
    event.preventDefault()

    const assignVariable = document.querySelector('#assignVariable').value
    const assignExpression = document.querySelector('#assignExpression').value

    currentTarget.innerHTML = assignVariable + " = " + assignExpression 

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
    updateDict()
    updateBodyWidth()
})
ifForm.addEventListener('submit', function(event){
    event.preventDefault()

    const ifExpression = document.querySelector('#ifExpression').value

    currentTarget.innerHTML = ifExpression

    currentTarget.setAttribute('condition', ifExpression)

    ifForm.reset()
    ifPopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        ifPopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#ifExpression').value = currentTarget.getAttribute('condition')
    })

    updateBranchWidth()
    updateDict()
    updateBodyWidth()
})
whileForm.addEventListener('submit', function(event){
    event.preventDefault()

    const whileExpression = document.querySelector('#whileExpression').value

    currentTarget.innerHTML = whileExpression

    currentTarget.setAttribute('condition', whileExpression)

    whileForm.reset()
    whilePopup.style.display = 'none'

    currentTarget.addEventListener('click', function(){
        whilePopup.style.display = 'block'
        currentTarget = this
        document.querySelector('#whileExpression').value = currentTarget.getAttribute('condition')
    })

    updateBranchWidth()
    updateDict()
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

    currentTarget.innerHTML = forVariable + " = " + forStartValue + " to " + forEndValue + " step " + forStep 

    currentTarget.setAttribute(
        'declareStatement',
        JSON.stringify({
            StatementType: "declare", 
            type: forDatatype,
            name: forVariable,
            next: null
        })
    )
    currentTarget.setAttribute(
        'assignStatement',
        JSON.stringify({
            StatementType: "assign", 
            name: forVariable,
            value: forStartValue,
            next: null
        })
    )

    currentTarget.setAttribute('condition', forCondition)

    currentTarget.setAttribute(
        'forLoopStatement',
        JSON.stringify({
            StatementType: "assign", 
            name: forVariable,
            value: `${forVariable} ${forOperator} ${forStep}`,
            next: null
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
    updateDict()
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
                value["StatementType"] = "input"
                var nextNode = node.parentNode.nextSibling.nextSibling
                if(nextNode === null || nextNode.id === undefined){
                    value["next"] = null
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    }
                    value["next"] = nextID
                } 

                var inputVariable = node.getAttribute('name')
                if(inputVariable === null){
                    inputVariable = ''
                }
                value["name"] = inputVariable

                break
            case "output parallelogram block":
                value["StatementType"] = "output"
                var nextNode = node.parentNode.nextSibling.nextSibling
                if(nextNode === null || nextNode.id === undefined){
                    value["next"] = null
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    }
                    value["next"] = nextID
                } 

                var outputExpression = node.getAttribute('name')
                if(outputExpression === null){
                    outputExpression = ''
                }
                value["name"] = outputExpression

                break
            case "declare rectangle block":
                value["StatementType"] = "declare"
                var nextNode = node.parentNode.nextSibling.nextSibling
                if(nextNode === null || nextNode.id === undefined){
                    value["next"] = null
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    }
                    value["next"] = nextID
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
                value["StatementType"] = "assign"
                var nextNode = node.parentNode.nextSibling.nextSibling
                if(nextNode === null || nextNode.id === undefined){
                    value["next"] = null
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    }
                    value["next"] = nextID
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
                value["StatementType"] = "if"
                var nextNode = node.parentNode.parentNode.parentNode.nextSibling.nextSibling
                if(nextNode === null || nextNode.id === undefined){
                    value["next"] = null
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    }
                    value["next"] = nextID
                } 
                var trueNode = node.parentNode.previousSibling.childNodes[1]
                var falseNode = node.parentNode.nextSibling.childNodes[1]
                if(trueNode.childNodes[1] === undefined){
                    value["true"] = null
                } else {
                    if(trueNode.childNodes[1].firstChild.className.includes('block')){
                        var nextID = trueNode.childNodes[1].firstChild.id
                    } else {
                        var nextID = trueNode.childNodes[1].firstChild.childNodes[1].firstChild.id
                    }
                    value["true"] = nextID
                } 
                if(falseNode.childNodes[1] === undefined){
                    value["false"] = null
                } else {
                    if(falseNode.childNodes[1].firstChild.className.includes('block')){
                        var nextID = falseNode.childNodes[1].firstChild.id
                    } else {
                        var nextID = falseNode.childNodes[1].firstChild.childNodes[1].firstChild.id
                    }
                    value["false"] = nextID
                } 

                var ifCondition = node.getAttribute('condition')
                if(ifCondition === null){
                    ifCondition = ''
                }
                value["condition"] = ifCondition

                break
            case "while hexagon block":
                value["StatementType"] = "while"
                var nextNode = node.parentNode.parentNode.parentNode.nextSibling.nextSibling
                if(nextNode === null || nextNode.id === undefined){
                    value["next"] = null
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    }
                    value["next"] = nextID
                } 
                var loopBody = node.parentNode.nextSibling.childNodes[1]
                if(loopBody.childNodes[1] === undefined){
                    value["loopStatement"] = null
                } else {
                    if(loopBody.childNodes[1].firstChild.className.includes('block')){
                        var nextID = loopBody.childNodes[1].firstChild.id
                    } else {
                        var nextID = loopBody.childNodes[1].firstChild.childNodes[1].firstChild.id
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
                value["StatementType"] = "for"
                var nextNode = node.parentNode.parentNode.parentNode.nextSibling.nextSibling
                if(nextNode === null || nextNode.id === undefined){
                    value["next"] = null
                } else {
                    if(nextNode.firstChild.className.includes('block')){
                        var nextID = nextNode.firstChild.id
                    } else {
                        var nextID = nextNode.firstChild.childNodes[1].firstChild.id
                    }
                    value["next"] = nextID
                } 
                var loopBody = node.parentNode.nextSibling.childNodes[1]
                if(loopBody.childNodes[1] === undefined){
                    value["loopStatement"] = null
                } else {
                    if(loopBody.childNodes[1].firstChild.className.includes('block')){
                        var nextID = loopBody.childNodes[1].firstChild.id
                    } else {
                        var nextID = loopBody.childNodes[1].firstChild.childNodes[1].firstChild.id
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
    console.log(dict)
}

function updateBranchWidth(){
    var nodes = Array.from(document.querySelectorAll('.rhombus, .hexagon'));
    nodes.sort(compareDepth);
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if(node.parentNode != parentPlace && !node.parentNode.className.includes("blockDescription")){
            if(node.className.includes('rhombus')){
                var leftBranch = node.parentNode.previousSibling.childNodes[1]
                var rightBranch = node.parentNode.nextSibling.childNodes[1]
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

function addEventListener(node) {
    const dropFunction = function(e){
        if(I){
            if(currentTarget.className == "rhombus block"){
                var aboveBlock = document.createElement("div")
                var leftCondition = document.createElement("div")
                var rightCondition = document.createElement("div")
                var leftBlock = document.createElement("div")
                var rightBlock = document.createElement("div")
                var bottomBlock = document.createElement("div")
                var ifStatement = document.createElement("div")
                
                var one = document.createElement("div")
                var three = document.createElement("div")
                var five = document.createElement("div")
                var seven = document.createElement("div")
                var eight = document.createElement("div")
                var nine = document.createElement("div")

                var left = document.createElement("div")
                var middle = document.createElement("div")
                var right = document.createElement("div")

                addEventListener(rightBlock)
                addEventListener(leftBlock)
                addEventListener(bottomBlock)
                addEventListener(aboveBlock)

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
                three.classList.add("space")
                five.classList.add("space")
                seven.classList.add("space")
                eight.classList.add("space")
                nine.classList.add("space")

                leftCondition.appendChild(leftBlock)
                rightCondition.appendChild(rightBlock)

                left.appendChild(one)
                left.appendChild(leftCondition)
                left.appendChild(seven)
                seven.style.minHeight = '121px'
                seven.style.maxHeight = '121px'
                seven.style.alignSelf = 'stretch'
                one.style.alignSelf = 'stretch'
                one.style.minHeight = '50px'
                one.style.maxHeight = '50px'
                left.style.alignSelf="stretch"

                middle.appendChild(currentTarget)
                middle.appendChild(five)
                middle.appendChild(eight)
                five.style.maxHeight = '50px'
                five.style.alignSelf = 'stretch'
                middle.style.alignSelf="stretch"

                right.appendChild(three)
                right.appendChild(rightCondition)
                right.appendChild(nine)
                nine.style.minHeight = '121px'
                nine.style.maxHeight = '121px'
                nine.style.alignSelf = 'stretch'
                three.style.alignSelf = 'stretch'
                three.style.maxHeight = '50px'
                right.style.alignSelf="stretch"

                ifStatement.appendChild(left)
                ifStatement.appendChild(middle)
                ifStatement.appendChild(right)

                node.parentNode.insertBefore(bottomBlock, this.nextSibling)
                node.parentNode.insertBefore(aboveBlock, this)
                node.appendChild(ifStatement)
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
                
                addEventListener(aboveBlock)
                addEventListener(bottomBlock)
                addEventListener(loopBlock)

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

                loopBody.appendChild(loopBlock)

                left.style.minWidth = '50px'
                
                middle.appendChild(currentTarget)
                middle.appendChild(three)
                middle.appendChild(five)
                middle.style.alignSelf="stretch"
                three.style.maxHeight = '50px'
                three.style.alignSelf = 'stretch'
                five.style.alignSelf = 'stretch'

                right.appendChild(two)
                right.appendChild(loopBody)
                right.appendChild(six)
                six.style.minHeight = '99px'
                six.style.alignSelf = 'stretch'
                two.style.alignSelf = 'stretch'

                loop.appendChild(left)
                loop.appendChild(middle)
                loop.appendChild(right)

                node.parentNode.insertBefore(bottomBlock, this.nextSibling)
                node.parentNode.insertBefore(aboveBlock, this)
                node.appendChild(loop)
            }
            else
            {
                var aboveBlock = document.createElement("div")
                var belowBlock = document.createElement("div")
                addEventListener(aboveBlock)
                addEventListener(belowBlock)
                aboveBlock.classList.add("holder")
                belowBlock.classList.add("holder")
                node.parentNode.insertBefore(aboveBlock, this)
                node.parentNode.insertBefore(belowBlock, this.nextSibling)
            }
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
                if(currentTarget.className == "rhombus block" || currentTarget.className == "hexagon block"){
                    currentBlock.parentNode.parentNode.nextSibling.remove()
                    currentBlock.parentNode.parentNode.remove()
                }
                else {
                    currentBlock.previousSibling.remove()
                    currentBlock.nextSibling.remove()
                }
            }
            updateBranchWidth()
            updateDict()
            updateBodyWidth()
            I = false
        }
    }
    node.addEventListener('dragover', function(e){
        e.preventDefault()
        if(node.childNodes.length === 0){
            I = true
            this.appendChild(currentTarget)
            if(first){
                var cloneShape = currentTarget.cloneNode(true)
                cloneShape.addEventListener('dragstart', function(e){
                    currentTarget = cloneShape
                    currentBlock = cloneShape.parentNode
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

addEventListener(blockHolder)
  

targetList.forEach(target => {
    target.addEventListener('dragstart', function(e){
        inBody = false 
        currentTarget = this
        currentBlock = this.parentNode
        // console.log(this.className)
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
            if(currentTarget.className == "rhombus block" || currentTarget.className.includes('hexagon')){
                currentBlock.parentNode.parentNode.nextSibling.remove()
                currentBlock.parentNode.parentNode.remove()
            }
            else{
                currentBlock.nextSibling.remove()
                currentBlock.remove()
            }
        }
        currentTarget.remove()
        updateBranchWidth()
        updateDict()
    }
})

updateDict()