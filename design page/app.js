var dropPlace = document.querySelector('.chart-section')
var targetList = document.querySelectorAll('.block')
var parentPlace = document.querySelector('.block-bar')
var blockHolder = document.querySelector('.block-holder')

var currentTarget = null
var currentBlock = null
var first = true
var I = false

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
  

function addEventListener(node) {
    node.addEventListener('dragover', function(e){
        e.preventDefault()
        if(node.childNodes.length === 0){
            I = true
            this.appendChild(currentTarget)
            if(first){
                var cloneShape = currentTarget.cloneNode(true)
                cloneShape.addEventListener('dragstart', function(e){
                    currentTarget = cloneShape
                    console.log(depth(currentTarget))
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
    node.addEventListener('drop', function(e){
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

                leftCondition.classList.add("code-block")
                rightCondition.classList.add("code-block")
                aboveBlock.classList.add("block-holder")
                leftBlock.classList.add("block-holder")
                rightBlock.classList.add("block-holder")
                bottomBlock.classList.add("block-holder")
                ifStatement.classList.add("branch-statement")
                
                left.classList.add("block-column")
                middle.classList.add("block-column")
                right.classList.add("block-column")
                
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
                seven.style.alignSelf = 'stretch'
                one.style.alignSelf = 'stretch'
                // left.style.alignSelf="stretch"

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
                nine.style.alignSelf = 'stretch'
                three.style.alignSelf = 'stretch'
                // right.style.alignSelf="stretch"

                ifStatement.appendChild(left)
                ifStatement.appendChild(middle)
                ifStatement.appendChild(right)

                node.parentNode.insertBefore(bottomBlock, this.nextSibling)
                node.parentNode.insertBefore(aboveBlock, this)
                node.appendChild(ifStatement)
            }
            else if(currentTarget.className == "hexagon block"){
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

                aboveBlock.classList.add("block-holder")
                bottomBlock.classList.add("block-holder")
                loopBlock.classList.add("block-holder")
                loopBody.classList.add("code-block")
                loop.classList.add("branch-statement")

                left.classList.add("block-column")
                middle.classList.add("block-column")
                right.classList.add("block-column")

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
                aboveBlock.classList.add("block-holder")
                belowBlock.classList.add("block-holder")
                node.parentNode.insertBefore(aboveBlock, this)
                node.parentNode.insertBefore(belowBlock, this.nextSibling)
            }
            if(currentBlock != parentPlace){
                if(currentTarget.className == "rhombus block" || currentTarget.className == "hexagon block"){
                    currentBlock.parentNode.parentNode.nextSibling.remove()
                    currentBlock.parentNode.parentNode.remove()
                }
                else {
                    currentBlock.nextSibling.remove()
                    currentBlock.previousSibling.remove()
                }
            }

            var nodes = Array.from(document.querySelectorAll('.rhombus, .hexagon'));
            nodes.sort(compareDepth);
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if(node.parentNode != parentPlace){
                    var leftBranch = node.parentNode.previousSibling
                    var rightBranch = node.parentNode.nextSibling
                    var maxWidth = Math.max(leftBranch.scrollWidth, rightBranch.scrollWidth)
                    leftBranch.style.minWidth = maxWidth + 'px'
                    rightBranch.style.minWidth = maxWidth + 'px'
                }
            }

            dropPlace.style.width = dropPlace.scrollWidth + 'px'
            I = false
        }
    })
}

addEventListener(blockHolder)
  

targetList.forEach(target => {
    target.addEventListener('dragstart', function(e){
        currentTarget = this
        console.log(depth(currentTarget))
        currentBlock = this.parentNode
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
            currentTarget.parentNode.nextSibling.remove()
            currentTarget.parentNode.previousSibling.remove()
            if(currentTarget.className == "rhombus block" || currentTarget.className == "hexagon block"){
                currentBlock.parentNode.parentNode.nextSibling.remove()
                currentBlock.parentNode.parentNode.remove()
        }
        }
        currentTarget.remove()
    }
})