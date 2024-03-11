// js file
// Testing console
console.log("Accessibility Rocks!");

// Variable to store the currently highlighted element, correct scope
var currentHighlight = null;

//Anything that appears between the curly braces will not be run until the whole web page has loaded
$(document).ready(function () { 
    // Tell all the elements on the page to let us know when the user’s mouse hovers over them
    $("*:not(body)").hover( 
        function (ev) {
            // Remove highlights from all other elements before adding a new one
            $(".highlight").removeClass("highlight");
            
            // Add highlight to the current element
            $(this).addClass("highlight");

            // Store the current highlighted element
            currentHighlight = this; 

            // Stop the event from propagating, only want the first element to trigger the outline
            ev.stopPropagation(); 
        },
        function (ev) {
            // Remove highlight when the mouse leaves the element
            $(this).removeClass("highlight");

            // Clear the current highlighted element
            currentHighlight = null; 

            // Stop any ongoing speech when the mouse leaves the element
            speechSynthesis.cancel();
        } 
    );

    // Vanilla JavaScript keydown event for the spacebar
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Space' || e.code === 'Unidentified' || e.code === '') {
            // Prevent the default spacebar action
            e.preventDefault(); 

            // Only speak if there is a highlighted element
            if (currentHighlight) {
                var textToSpeak = '';
                if (currentHighlight.tagName.toLowerCase() === 'img') {
                    // If the element is an image, get the alt text or the image url
                    var altText = $(currentHighlight).attr('alt');
                    var srcOfImg = $(currentHighlight).attr('src');
                    textToSpeak = altText || srcOfImg;
                } else {
                    // For non-image elements, get the text content
                    textToSpeak = $(currentHighlight).text();
                }
                var utterance = new SpeechSynthesisUtterance(textToSpeak);
                speechSynthesis.speak(utterance);
            }
        } else {
            // If any other key is pressed, stop speaking
            speechSynthesis.cancel();
            if (currentHighlight) {
                $(currentHighlight).removeClass("highlight");
                
                // Clear the current highlighted element
                currentHighlight = null; 
            }
        }
    });
});
