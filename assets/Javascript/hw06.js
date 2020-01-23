// buttons by default showing ont the html
var topics = ["singing in the rain", "carousel", "seven brides for seven brothers"]

// onclick for the submit button id search
// read the input content
// search(input)

//  variables string  / num / array / objects / boolean
// function  piece of code and excute just when you call it

// DOM  elements  <tag  attributes>content or text</tag>   the element relation is parents children siblings 

$("#search").on("click", function(){
    event.preventDefault()
    console.log("clicked search")
    var input = $("#gif-search").val()
    console.log(input)
    search(input)
    topics.push(input)
    renderButtons()

})

function renderButtons() {

    $("#topics").empty()

    for (var i = 0; i < topics.length; i++) {

        var btn = `<button class="btngif" index=${i}>${topics[i]}</button>`
        $("#topics").append(btn)
    }

    $(".btngif").on("click", function () {
        // get which one was clicked
        var index = $(this).attr("index")
        console.log(index, topics[index])
        search(topics[index])
        // search with the API
    })
}



// search gift using giphy API
function search(topic) {

    var apikey = "SJyMqFrQCwrsGYbYgq51PuaCAIPJX0JN"
    var query = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apikey
    console.log(query)
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (results) {
        console.log(results.data)
        showGif(results.data)
    })
}


// show the result on th HTML
function showGif(data){
    $("#results").empty()
        for (var i=0; i<data.length; i++){
            var image = "<img class='gif' src="+ data[i].images.fixed_height_still.url + " src-alt=" + data[i].images.fixed_height.url + ">"
            $("#results").append(image)
        }
    $(".gif").on("click", function(){
        var tempSRC = $(this).attr("src")
        var tempALT = $(this).attr("src-alt")
        $(this).attr("src", tempALT )
        $(this).attr("src-alt", tempSRC)


    })

}

renderButtons()