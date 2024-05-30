document.addEventListener('DOMContentLoaded', function() {
    let currentStoryIndex = 0;
    const stories = document.querySelectorAll('.story');
    const totalStories = stories.length;

    // Show the first story
    stories[currentStoryIndex].classList.add('active');

    // Function to show the next story
    window.nextStory = function() {
        if (currentStoryIndex < totalStories - 1) {
            stories[currentStoryIndex].classList.remove('active');
            currentStoryIndex++;
            stories[currentStoryIndex].classList.add('active');
        }
        updateNavigation();
    };

    // Function to show the previous story
    window.prevStory = function() {
        if (currentStoryIndex > 0) {
            stories[currentStoryIndex].classList.remove('active');
            currentStoryIndex--;
            stories[currentStoryIndex].classList.add('active');
        }
        updateNavigation();
    };

    // Update navigation button states
    function updateNavigation() {
        document.getElementById('prevBtn').disabled = currentStoryIndex === 0;
        document.getElementById('nextBtn').disabled = currentStoryIndex === totalStories - 1;
    }

    updateNavigation();

    // Example data fetching (assuming you have a data.json file)
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displaySummaryStats(data.summary);
            displayImpactDetails(data.impact);
            displayDonorStories(data.stories);
            createDonationChart(data.chartData);

        });
        displaySummaryStats(sampleJson.summary);
        displayImpactDetails(sampleJson.impact);
        displayDonorStories(sampleJson.stories);
        createDonationChart(sampleJson.chartData);

    function displaySummaryStats(summary) {
        const summaryStats = document.getElementById('summary-stats');
        summaryStats.innerHTML = `
            <p>Total Donations: $${summary.totalDonations}</p>
            <p>Number of Donors: ${summary.numberOfDonors}</p>
            <p>Projects Funded: ${summary.projectsFunded}</p>
        `;
    }

    function displayImpactDetails(impact) {
        const impactDetails = document.getElementById('impact-details');
        impactDetails.innerHTML = impact.map(detail => `
            <div class="impact-item">
                <h3>${detail.title}</h3>
                <p>${detail.description}</p>
            </div>
        `).join('');
    }

    function displayDonorStories(stories) {
        const donorStories = document.getElementById('donor-stories');
        donorStories.innerHTML = stories.map(story => `
            <div class="story-item">
                <h3>${story.name}</h3>
                <p>${story.story}</p>
            </div>
        `).join('');
    }
});

// Function to create the chart
function createDonationChart(chartData) {
    const ctx = document.getElementById('donation-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Donations',
                data: chartData.data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
sampleJson = {
    "summary": {
        "totalDonations": 50000,
        "numberOfDonors": 120,
        "projectsFunded": 15
    },
    "impact": [
        {
            "title": "Project A",
            "description": "Description of the impact of Project A."
        },
        {
            "title": "Project B",
            "description": "Description of the impact of Project B."
        }
    ],
    "stories": [
        {
            "name": "John Doe",
            "story": "John's story of how the donation impacted his life."
        },
        {
            "name": "Jane Smith",
            "story": "Jane's story of how the donation helped her community."
        }
    ],
    "chartData": {
        "labels": ["January", "February", "March", "April"],
        "data": [5000, 8000, 6000, 7000]
    }
}