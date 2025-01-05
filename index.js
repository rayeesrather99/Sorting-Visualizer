const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const algorithmSelect = document.querySelector("#algorithms");
const visualization = document.querySelector(".visualization");

let sortingAlgorithm = null;
let stopSort = false;
let algoSpeed = 500;

// Function to generate random data bars
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

// Function to animate swapping of two bars
async function swapBars(bar1, bar2) {
    const tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
    await new Promise((resolve) => setTimeout(resolve, algoSpeed));
}

// Bubble Sort
async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;

    for (let i = 0; i < n - 1; i++) {
        if (stopSort) return; // Stop if requested
        for (let j = 0; j < n - i - 1; j++) {
            if (stopSort) {
                highlightActiveBars(bars[j], bars[j + 1]); // Highlight active bars
                return; // Stop if requested
            }

            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            await new Promise((resolve) => setTimeout(resolve, algoSpeed));

            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                await swapBars(bars[j], bars[j + 1]);
            }

            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';
        }
    }
}

// Selection Sort
async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;

    for (let i = 0; i < n - 1; i++) {
        if (stopSort) return; // Stop if requested
        let min = i;

        for (let j = i + 1; j < n; j++) {
            if (stopSort) {
                highlightActiveBars(bars[j], bars[min]); // Highlight active bars
                return; // Stop if requested
            }

            bars[j].style.backgroundColor = 'red';
            bars[min].style.backgroundColor = 'red';

            await new Promise((resolve) => setTimeout(resolve, algoSpeed));

            if (parseInt(bars[j].style.height) < parseInt(bars[min].style.height)) {
                bars[min].style.backgroundColor = '#3498db';
                min = j;
            } else {
                bars[j].style.backgroundColor = '#3498db';
            }
        }

        if (min !== i) {
            await swapBars(bars[i], bars[min]);
        }

        bars[min].style.backgroundColor = '#3498db';
        bars[i].style.backgroundColor = '#3498db';
    }
}

// Merge Sort
async function mergeSort(bars, left, right) {
    if (stopSort) return; // Stop if requested
    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        await mergeSort(bars, left, mid);
        await mergeSort(bars, mid + 1, right);

        await merge(bars, left, mid, right);
    }
}

async function merge(bars, left, mid, right) {
    if (stopSort) return; // Stop if requested
    const leftPart = Array.from(bars).slice(left, mid + 1);
    const rightPart = Array.from(bars).slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftPart.length && j < rightPart.length) {
        if (stopSort) {
            highlightActiveBars(leftPart[i], rightPart[j]); // Highlight active bars
            return; // Stop if requested
        }

        leftPart[i].style.backgroundColor = 'red';
        rightPart[j].style.backgroundColor = 'red';

        await new Promise((resolve) => setTimeout(resolve, algoSpeed));

        if (parseInt(leftPart[i].style.height) <= parseInt(rightPart[j].style.height)) {
            bars[k].style.height = leftPart[i].style.height;
            i++;
        } else {
            bars[k].style.height = rightPart[j].style.height;
            j++;
        }

        bars[k].style.backgroundColor = '#3498db';
        k++;
    }

    while (i < leftPart.length) {
        if (stopSort) {
            highlightActiveBars(leftPart[i]); // Highlight active bar
            return; // Stop if requested
        }

        bars[k].style.height = leftPart[i].style.height;
        bars[k].style.backgroundColor = '#3498db';
        i++;
        k++;
    }

    while (j < rightPart.length) {
        if (stopSort) {
            highlightActiveBars(rightPart[j]); // Highlight active bar
            return; // Stop if requested
        }

        bars[k].style.height = rightPart[j].style.height;
        bars[k].style.backgroundColor = '#3498db';
        j++;
        k++;
    }
}

// Highlight active bars
function highlightActiveBars(...bars) {
    bars.forEach(bar => {
        if (bar) bar.style.backgroundColor = 'yellow'; // Highlight active bars
    });
}

// Event listeners for the buttons
startButton.addEventListener("click", async () => {
    if (sortingAlgorithm) {
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = true;
        algorithmSelect.disabled = true;
        stopSort = false;

        const bars = document.querySelectorAll('.bar');
        if (sortingAlgorithm === 'bubble') {
            await bubbleSort();
        } else if (sortingAlgorithm === 'selection') {
            await selectionSort();
        } else if (sortingAlgorithm === 'merge') {
            await mergeSort(bars, 0, bars.length - 1);
        }

        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
        algorithmSelect.disabled = false;
    } else {
        alert("Please select a sorting algorithm.");
    }
});

stopButton.addEventListener("click", () => {
    stopSort = true; // Request stop
});

resetButton.addEventListener("click", () => {
    stopSort = true; // Stop any ongoing sorting
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    algorithmSelect.disabled = false;
    generateRandomData();
});

// Event listener for algorithm selection
algorithmSelect.addEventListener("change", () => {
    sortingAlgorithm = algorithmSelect.value;
    generateRandomData();
});

// Event listener for speed range input
const speedRangeInput = document.querySelector(".speedRange");
speedRangeInput.addEventListener("input", () => {
    algoSpeed = parseInt(speedRangeInput.value);
});

// Initial setup
generateRandomData();
