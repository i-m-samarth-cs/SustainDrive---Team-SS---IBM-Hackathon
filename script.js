const API_KEY = "EM1euB_cDEE2Rm71l8RnRzYClzifLB27ZjTIQ1UrzA8n";
const scoring_url = "https://au-syd.ml.cloud.ibm.com/ml/v4/deployments/b8702977-93ef-4991-a72b-a401f659bf25/predictions?version=2021-05-01";

function predict() {
    const modelName = document.getElementById("model_txt").value.trim();
    const engineSize = parseFloat(document.getElementById("engine_size").value);
    const fuelType = document.getElementById("fuel_type").value.trim();
    const fuelCity = parseFloat(document.getElementById("fuel_city").value);
    const fuelHighways = parseFloat(document.getElementById("fuel_highways").value);
    const predictionResult = document.getElementById("prediction_result");
    const suggestionResult = document.getElementById("suggestion_result");

    // Initialize result to a default message
    let result = "No matching record found.";
    let suggestion = "No suggestions available.";

    // Example dynamic comparison logic based on different conditions
    if (modelName === "Ford") {
        if (engineSize >= 1.5 && engineSize <= 10.0) {
            if (fuelType === "Petrol") {
                if (fuelCity >= 10 && fuelCity <= 12) {
                    if (fuelHighways >= 15 && fuelHighways <= 18) {
                        result = "Predicted Carbon Emission: 160 g/km";
                        suggestion = "Consider regular maintenance and driving at moderate speeds to improve fuel efficiency.";
                    } else if (fuelHighways < 15) {
                        result = "Predicted Carbon Emission: 180 g/km";
                        suggestion = "Switch to eco-driving habits and reduce highway speeds for lower emissions.";
                    } else if (fuelHighways > 18) {
                        result = "Predicted Carbon Emission: 150 g/km";
                        suggestion = "Explore hybrid or electric vehicle options to further reduce emissions.";
                    }
                } else if (fuelCity < 10) {
                    result = "Predicted Carbon Emission: 190 g/km";
                    suggestion = "Switch to eco-driving habits and consider regular maintenance.";
                } else if (fuelCity > 12) {
                    result = "Predicted Carbon Emission: 140 g/km";
                    suggestion = "Good fuel efficiency, continue with regular maintenance.";
                }
            } else if (fuelType === "Diesel") {
                if (fuelCity >= 8 && fuelCity <= 10) {
                    if (fuelHighways >= 12 && fuelHighways <= 14) {
                        result = "Predicted Carbon Emission: 170 g/km";
                        suggestion = "Consider using higher-quality fuel and adopting fuel-efficient driving practices.";
                    } else if (fuelHighways > 14) {
                        result = "Predicted Carbon Emission: 150 g/km";
                        suggestion = "Explore eco-friendly diesel alternatives or consider a hybrid vehicle.";
                    }
                } else {
                    result = "Predicted Carbon Emission: 180 g/km";
                    suggestion = "Improving city fuel efficiency can significantly lower emissions.";
                }
            }
        } else {
            result = "Engine size mismatch for Ford model.";
            suggestion = "Check if you have entered the correct engine size.";
        }
    } else if (modelName === "Tata") {
        if (engineSize >= 1.8 && engineSize <= 10.2) {
            if (fuelType === "Diesel") {
                if (fuelCity >= 7 && fuelCity <= 9) {
                    if (fuelHighways >= 10 && fuelHighways <= 13) {
                        result = "Predicted Carbon Emission: 160 g/km";
                        suggestion = "Consider regular vehicle maintenance to optimize fuel usage.";
                    } else if (fuelHighways > 13) {
                        result = "Predicted Carbon Emission: 140 g/km";
                        suggestion = "Switching to a hybrid or electric vehicle would significantly reduce emissions.";
                    }
                } else {
                    result = "Predicted Carbon Emission: 170 g/km";
                    suggestion = "Consider improving city fuel efficiency to lower emissions.";
                }
            } else if (fuelType === "Petrol") {
                if (fuelCity >= 10 && fuelCity <= 12) {
                    if (fuelHighways >= 14) {
                        result = "Predicted Carbon Emission: 160 g/km";
                        suggestion = "Consider hybrid options or further improve fuel efficiency for lower emissions.";
                    } else {
                        result = "Predicted Carbon Emission: 180 g/km";
                        suggestion = "Adopt eco-driving habits and perform regular vehicle maintenance.";
                    }
                } else {
                    result = "Predicted Carbon Emission: 200 g/km";
                    suggestion = "Consider switching to a more fuel-efficient vehicle model.";
                }
            }
        } else {
            result = "Engine size mismatch for Tata model.";
            suggestion = "Check if you have entered the correct engine size.";
        }
    } else if (modelName === "Hyundai") {
        if (engineSize >= 1.8 && engineSize <= 10.2) {
            if (fuelType === "Diesel") {
                if (fuelCity >= 9 && fuelCity <= 11) {
                    if (fuelHighways >= 12 && fuelHighways <= 14) {
                        result = "Predicted Carbon Emission: 170 g/km";
                        suggestion = "Consider upgrading to a more fuel-efficient model or a hybrid vehicle.";
                    } else if (fuelHighways > 14) {
                        result = "Predicted Carbon Emission: 150 g/km";
                        suggestion = "Eco-driving practices can help reduce emissions further.";
                    }
                } else {
                    result = "Predicted Carbon Emission: 180 g/km";
                    suggestion = "Consider driving at lower speeds and performing regular maintenance.";
                }
            }
        } else {
            result = "Engine size mismatch for Hyundai model.";
            suggestion = "Check if you have entered the correct engine size.";
        }
    } else if (modelName === "Hero") {
        if (engineSize >= 100 && engineSize <= 500) {
            if (fuelType === "Petrol") {
                if (fuelCity >= 35 && fuelCity <= 50) {
                    result = "Predicted Carbon Emission: 90 g/km";
                    suggestion = "Good fuel efficiency for a bike! Regular maintenance will keep it optimal.";
                } else {
                    result = "Predicted Carbon Emission: 120 g/km";
                    suggestion = "Drive at moderate speeds for better fuel efficiency.";
                }
            } else if (fuelType === "Electric") {
                result = "Predicted Carbon Emission: 0 g/km";
                suggestion = "Great choice! Consider regular battery maintenance to keep emissions low.";
            }
        } else {
            result = "Engine size mismatch for Hero bike.";
            suggestion = "Ensure you’ve entered the correct engine size for your bike model.";
        }
    } else if (modelName === "Bajaj") {
        if (engineSize >= 150 && engineSize <= 400) {
            if (fuelType === "Petrol") {
                if (fuelCity >= 35 && fuelCity <= 45) {
                    result = "Predicted Carbon Emission: 110 g/km";
                    suggestion = "Efficient fuel consumption. Keep up with regular maintenance.";
                } else if (fuelCity > 45) {
                    result = "Predicted Carbon Emission: 100 g/km";
                    suggestion = "You have a great fuel-efficient bike, keep it up!";
                } else {
                    result = "Predicted Carbon Emission: 130 g/km";
                    suggestion = "Consider more fuel-efficient driving habits.";
                }
            } else if (fuelType === "Electric") {
                result = "Predicted Carbon Emission: 0 g/km";
                suggestion = "Excellent choice for reducing emissions! Ensure to maintain the battery.";
            }
        } else {
            result = "Engine size mismatch for Bajaj bike.";
            suggestion = "Please verify the engine size.";
        }
    } else if (modelName === "TVS") {
        if (engineSize >= 50 && engineSize <= 300) {
            if (fuelType === "Petrol") {
                if (fuelCity >= 40 && fuelCity <= 50) {
                    result = "Predicted Carbon Emission: 80 g/km";
                    suggestion = "Excellent fuel efficiency! Regular maintenance will help.";
                } else {
                    result = "Predicted Carbon Emission: 100 g/km";
                    suggestion = "Adopt moderate speeds to improve efficiency.";
                }
            } else if (fuelType === "Electric") {
                result = "Predicted Carbon Emission: 0 g/km";
                suggestion = "Great choice for reducing emissions! Regular battery upkeep is recommended.";
            }
        } else {
            result = "Engine size mismatch for TVS vehicle.";
            suggestion = "Check the engine size of your vehicle.";
        }
    } else if (modelName === "Piago") {
        if (engineSize >= 0.7 && engineSize <= 1.2) {
            if (fuelType === "Petrol") {
                if (fuelCity >= 10 && fuelCity <= 12) {
                    result = "Predicted Carbon Emission: 200 g/km";
                    suggestion = "Eco-friendly driving practices will help lower emissions.";
                } else if (fuelCity < 10) {
                    result = "Predicted Carbon Emission: 220 g/km";
                    suggestion = "Consider reducing idle time and driving with better fuel efficiency.";
                } else {
                    result = "Predicted Carbon Emission: 180 g/km";
                    suggestion = "Great city fuel efficiency! Keep the vehicle well-maintained.";
                }
            } else if (fuelType === "CNG") {
                result = "Predicted Carbon Emission: 120 g/km";
                suggestion = "Great choice! CNG is a cleaner fuel option with lower emissions.";
            }
        } else {
            result = "Engine size mismatch for Auto Rickshaw.";
            suggestion = "Please verify the engine size.";
        }
    } else if (modelName === "Mahindra Truck") {
        if (engineSize >= 3.5 && engineSize <= 7.0) {
            if (fuelType === "Diesel") {
                if (fuelCity >= 4 && fuelCity <= 6) {
                    result = "Predicted Carbon Emission: 250 g/km";
                    suggestion = "Use eco-driving techniques and consider a fuel-efficient truck model.";
                } else if (fuelCity < 4) {
                    result = "Predicted Carbon Emission: 280 g/km";
                    suggestion = "Consider switching to hybrid or electric alternatives for trucks.";
                }
            }
        } else {
            result = "Engine size mismatch for Mahindra truck.";
            suggestion = "Please verify the engine size.";
        }
    } else if (modelName === "Ashok Leyland Truck") {
        if (engineSize >= 5.0 && engineSize <= 9.0) {
            if (fuelType === "Diesel") {
                if (fuelCity >= 3 && fuelCity <= 5) {
                    result = "Predicted Carbon Emission: 270 g/km";
                    suggestion = "Consider switching to a more fuel-efficient vehicle or hybrid alternatives.";
                }
            }
        } else {
            result = "Engine size mismatch for Ashok Leyland truck.";
            suggestion = "Please double-check the truck's engine size.";
        }
    }
    else {
        result = "Model not found.";
        suggestion = "Please enter a valid model name.";
    }

    // Display the result in the text area
    predictionResult.value = result + "\n" +"\n" + suggestion;

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