const API_KEY = '5cf43a76ddmsh647724d6cbe4c3fp190a1bjsn4fc014496a50';  // Your actual API Key
const API_URL = 'https://body-mass-index-bmi-calculator.p.rapidapi.com/metric';  // Correct API URL

document.getElementById('bmi-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent form submission

    let weight = document.getElementById('weight').value;
    let height = document.getElementById('height').value;

    if (!weight || !height) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        let response = await fetch(`${API_URL}?weight=${weight}&height=${height}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": "body-mass-index-bmi-calculator.p.rapidapi.com"
            }
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        let data = await response.json();

        const bmi = data.bmi;
        document.getElementById('bmi-result').innerText = bmi;

        // Classify the BMI and show classification and health risk
        const classificationData = classifyBMI(bmi);
        document.getElementById('classification').innerText = classificationData.classification;
        document.getElementById('health-risk').innerText = classificationData.healthRisk;

    } catch (error) {
        console.error("Error fetching BMI data:", error);
        alert("Failed to load data. Please try again later.");
    }
});

// Function to classify BMI and return health risk or benefits
function classifyBMI(bmi) {
    let classification = '';
    let healthRisk = '';

    if (bmi < 18.5) {
        classification = 'Underweight';
        healthRisk = `- Nutritional Deficiencies
- Weakened Immune System
- Muscle Wasting
- Bone Health Issues
- Fertility Issues`;
    } else if (bmi >= 18.5 && bmi < 25) {
        classification = 'Normal';
        healthRisk = `No health risks. These are health benefits for this classification:
- Lower Risk of Chronic Diseases
- Better Physical Functioning
- Better Mental Health`;
    } else if (bmi >= 25 && bmi < 30) {
        classification = 'Overweight';
        healthRisk = `- Increased Risk of Heart Disease
- Type 2 Diabetes
- Joint Problems
- Sleep Apnea`;
    } else if (bmi >= 30 && bmi < 40) {
        classification = 'Obese';
        healthRisk = `- Heart Disease
- Type 2 Diabetes
- Breathing Problems
- Cancer
- Liver Disease`;
    } else {
        classification = 'Severely Obese';
        healthRisk = `- Severe Heart Disease
- Type 2 Diabetes
- Mobility Issues
- Sleep Apnea
- Liver Disease
- Mental Health Issues`;
    }

    return { classification, healthRisk };
}
