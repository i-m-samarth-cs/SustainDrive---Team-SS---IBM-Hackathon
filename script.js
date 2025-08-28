

    const apiKey = "aZXZPfuwTGBmb9sGcZMA-ETnyjUpOmT2v9FciWQQWy14";
const url = "https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/0a718782-bf97-4425-9bf7-e4b909d3576e/v1/synthesize";

// This variable will hold the prediction result
const predictionResult2 = {
    value: result + "\n\n" + suggestion
};

async function synthesizeSpeech(text) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "audio/wav",
        "Authorization": `Basic ${btoa("apikey:" + apiKey)}`
    });

    const body = JSON.stringify({
        text: text,
        voice: "en-US_MichaelV3Voice"
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Play the audio in the browser
        const audio = new Audio(audioUrl);
        audio.play();

        console.log("Audio played successfully");
    } catch (error) {
        console.error("Failed to synthesize speech:", error);
    }
}

// Call the function with the prediction result
synthesizeSpeech(predictionResult2.value);

}

////#####

// Initialize Variables
let isListening = false; // Track if speech recognition is active
let recognition; // Speech recognition instance

// Toggle Button Functionality
const toggleButton = document.getElementById("toggle-btn");
toggleButton.addEventListener("click", () => {
  if (isListening) {
    stopListening();
    toggleButton.textContent = "🎙️";
    toggleButton.classList.add("off");
    isListening = false;
  } else {
    startListening();
    toggleButton.textContent = "🔇";
    toggleButton.classList.remove("off");
    isListening = true;
  }
});

// Start Speech Recognition
function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition. Please use a modern browser.");
    return;
  }

  // Initialize speech recognition
  recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // Set language
  recognition.interimResults = false; // Process only final results
  recognition.maxAlternatives = 1; // Get one result

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.toLowerCase().trim();
    console.log("User said:", speechResult);

    // Check if the user said "open chatbot"
    if (speechResult === "open chatbot") {
      openChatbot();
    } else {
      console.log("Keyword not detected. Waiting for 'open chatbot'.");
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start(); // Restart recognition only if listening is enabled
    }
  };

  recognition.start(); // Start listening
  console.log("Speech recognition started.");
}

// Stop Speech Recognition
function stopListening() {
  if (recognition) {
    recognition.abort(); // Stop listening
    console.log("Speech recognition stopped.");
  }
}