var dropPlace = document.querySelector('.chart-section')
var targetList = document.querySelectorAll('.block')
var parentPlace = document.querySelector('.block-bar')
var blockHolders = document.querySelector('.block-holder')

var currentTarget = null
var first = true

targetList.forEach(target => {
    target.addEventListener('dragstart', function(e){
        currentTarget = this
        if(parentPlace.contains(currentTarget)){
            first = true
        }
    })
})

blockHolders.addEventListener('dragover', function(e){
    console.log('drag')
    e.preventDefault()
    this.appendChild(currentTarget)
    if(first){
        var cloneShape = currentTarget.cloneNode(true)
        cloneShape.addEventListener('dragstart', function(e){
            currentTarget = cloneShape
            if(parentPlace.contains(currentTarget)){
                first = true
            }
        })
        parentPlace.appendChild(cloneShape)
        first = false
    }
})
blockHolders.addEventListener('drop', function(e){
    this.appendChild(currentTarget)
})

parentPlace.addEventListener('dragover', function(e){
    e.preventDefault()
})
parentPlace.addEventListener('drop', function(e){
    currentTarget.remove()
})