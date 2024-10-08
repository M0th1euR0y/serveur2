async function demarrerLeTest() {
    const url = document.getElementById('service-url').value;
    const resultDiv = document.getElementById('result');
    const verdictDiv = document.getElementById('verdict');
    resultDiv.innerHTML = " ";
    resultDiv.innerHTML = "Test en cours...\n";
    verdictDiv.innerHTML = "";

    let tests;
    try {
        const response = await fetch('Test.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        tests = await response.json();
    } catch (error) {
        resultDiv.innerHTML += `Erreur lors du chargement des tests: ${error.message}\n\n`;
        return;
    }
    
    let allPassed = true;
    resultDiv.innerHTML = "";
    for (const test of tests) {
        try {
            const queryParams = new URLSearchParams(test).toString();
            const response = await fetch(`${url}?${queryParams}`);
            const data = await response.json();
            
            const passed = JSON.stringify(data) === JSON.stringify(test.expected);
            if (data.error) {
                resultDiv.innerHTML += `OK ---> ${JSON.stringify(data)}\n`;
            } else if (passed || isValueAcceptable(data.value)) {
                resultDiv.innerHTML += `OK ---> ${JSON.stringify(data)}\n`;
            } else {
                resultDiv.innerHTML += `Erreur ---> ${JSON.stringify(data)}\n`;
                allPassed = false;
            }
        } catch (error) {
            resultDiv.innerHTML += `Erreur lors du test ${JSON.stringify(test)}: ${error.message}\n\n`;
            allPassed = false;
        }
    }
    
    if (allPassed) {
        verdictDiv.innerHTML = `<span class="success">Bravo!!! Aucun problème</span>`;
    } else {
        verdictDiv.innerHTML = `<span class="error">Certains tests ont échoué</span>`;
    }
}

function isValueAcceptable(value) {
    if (value === null) return true;
    if (typeof value === 'number' && (value <= 0 || value % 1 )) return true;
    if (typeof value === 'string' && value.includes(',')) return true;
    if (typeof value === 'boolean') return true;
    return false;
}