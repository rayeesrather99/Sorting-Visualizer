const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const algorithmSelect = document.querySelector("#algorithms");
const visualization = document.querySelector(".visualization");

let sortingAlgorithm = null; 
let stopSort = false;
let activeBars = [];
let algoSpeed = 500; 

function generateRandomData() {
    visualization.innerHTML = '';

    // Generate new random bars
    for (let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = Math.floor(Math.random() * 100 + 10) + 'px';
        visualization.appendChild(bar);
    }
}

// Function to animate the swapping of two bars
async function swapBars(bar1, bar2) {
    const tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
    await new Promise((resolve) => setTimeout(resolve, 100));
}

// Function to perform Bubble Sort
async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (stopSort) {
                // Highlight the currently active bars
                activeBars.forEach(bar => {
                    bar.style.backgroundColor = 'yellow';
                });
                return;
            }

            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            await new Promise((resolve) => setTimeout(resolve, algoSpeed));

            const height1 = parseInt(bars[j].style.height);
            const height2 = parseInt(bars[j + 1].style.height);

            if (height1 > height2) {
                activeBars = [bars[j], bars[j + 1]];
                await swapBars(bars[j], bars[j + 1]);
            }

            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';
        }
    }
    
    activeBars.forEach(bar => {
        bar.style.backgroundColor = '#3498db';
    });
}

// Function to perform Selection Sort
async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;

    for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (stopSort) {
                // Highlight the currently active bars
                activeBars.forEach(bar => {
                    bar.style.backgroundColor = 'yellow';
                });
                return;
            }

            bars[j].style.backgroundColor = 'red';
            bars[min].style.backgroundColor = 'red';

            await new Promise((resolve) => setTimeout(resolve, algoSpeed));

            const height1 = parseInt(bars[j].style.height);
            const height2 = parseInt(bars[min].style.height);

            if (height1 < height2) {
                min = j;
            }

            bars[j].style.backgroundColor = '#3498db';
            bars[min].style.backgroundColor = '#3498db';
        }

        if (min !== i) {
            activeBars = [bars[i], bars[min]];
            await swapBars(bars[i], bars[min]);
        }
    }

    activeBars.forEach(bar => {
        bar.style.backgroundColor = '#3498db';
    });
}

// Event listener for the "Start" button
startButton.addEventListener("click", async () => {
    if (sortingAlgorithm) {
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = true;
        algorithmSelect.disabled = true;
        stopSort = false;

        if (sortingAlgorithm === 'bubble') {
            await bubbleSort();
        } else if (sortingAlgorithm === 'selection') {
            await selectionSort();
        }

        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
        algorithmSelect.disabled = false;
    } else {
        alert("Please select a sorting algorithm.");
    }
});

// Event listener for the "Stop" button
stopButton.addEventListener("click", () => {
    stopSort = true;
});

// Event listener for the "Reset" button
resetButton.addEventListener("click", () => {
    stopSort = true; // Stop sorting if it's in progress
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    algorithmSelect.disabled = false;
    generateRandomData(); // Generate new random data
});

// Event listener for algorithm selection
algorithmSelect.addEventListener("change", () => {
    sortingAlgorithm = algorithmSelect.value;
    generateRandomData();
});

//Function to handle speed Range
const speedRangeInput = document.querySelector(".speedRange");

// Event listener for speed range input
speedRangeInput.addEventListener("input", () => {
    algoSpeed = parseInt(speedRangeInput.value);
});


// Initial setup
generateRandomData();
