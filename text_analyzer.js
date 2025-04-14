document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsContainer = document.getElementById('results-container');
    
    const letterCountElement = document.getElementById('letter-count');
    const wordCountElement = document.getElementById('word-count');
    const spaceCountElement = document.getElementById('space-count');
    const newlineCountElement = document.getElementById('newline-count');
    const specialCountElement = document.getElementById('special-count');
    
    const pronounsList = document.getElementById('pronouns-list');
    const prepositionsList = document.getElementById('prepositions-list');
    const articlesList = document.getElementById('articles-list');
    
    const pronouns = [
        'i', 'me', 'my', 'mine', 'myself',
        'you', 'your', 'yours', 'yourself', 'yourselves',
        'he', 'him', 'his', 'himself',
        'she', 'her', 'hers', 'herself',
        'it', 'its', 'itself',
        'we', 'us', 'our', 'ours', 'ourselves',
        'they', 'them', 'their', 'theirs', 'themselves',
        'this', 'that', 'these', 'those',
        'who', 'whom', 'whose', 'which', 'what'
    ];
    
    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at',
        'before', 'behind', 'below', 'beneath', 'beside', 'besides', 'between', 'beyond', 'by',
        'concerning', 'considering', 'despite', 'down', 'during',
        'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out',
        'outside', 'over', 'past', 'regarding', 'round', 'since', 'through', 'throughout', 'to', 'toward',
        'under', 'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'
    ];
    
    const indefiniteArticles = ['a', 'an'];
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            const text = textInput.value;
            
            if (!text.trim()) {
                alert('Please enter some text to analyze.');
                return;
            }
            
            analyzeText(text);
            resultsContainer.style.display = 'grid';
        });
    }
    
    function analyzeText(text) {
        const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
        const spaceCount = (text.match(/\s/g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;
        const specialCount = (text.match(/[^\w\s]/g) || []).length;
        
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const wordCount = words.length;
        
        letterCountElement.textContent = letterCount;
        wordCountElement.textContent = wordCount;
        spaceCountElement.textContent = spaceCount;
        newlineCountElement.textContent = newlineCount;
        specialCountElement.textContent = specialCount;
        
        const pronounCounts = countTokens(words, pronouns);
        const prepositionCounts = countTokens(words, prepositions);
        const articleCounts = countTokens(words, indefiniteArticles);
        
        displayResults(pronounsList, pronounCounts);
        displayResults(prepositionsList, prepositionCounts);
        displayResults(articlesList, articleCounts);
    }
    
    function countTokens(words, tokenList) {
        const counts = {};
        
        tokenList.forEach(token => {
            counts[token] = 0;
        });
        
        words.forEach(word => {
            if (tokenList.includes(word)) {
                counts[word]++;
            }
        });
        
        return counts;
    }
    
    function displayResults(container, counts) {
        container.innerHTML = '';
        
        const sortedItems = Object.entries(counts)
            .filter(([, count]) => count > 0)
            .sort((a, b) => b[1] - a[1]);
        
        if (sortedItems.length === 0) {
            const listItem = document.createElement('li');
            listItem.className = 'result-item';
            listItem.textContent = 'No matches found';
            container.appendChild(listItem);
            return;
        }
        
        sortedItems.forEach(([token, count]) => {
            const listItem = document.createElement('li');
            listItem.className = 'result-item';
            
            const tokenElement = document.createElement('span');
            tokenElement.className = 'result-name';
            tokenElement.textContent = token;
            
            const countElement = document.createElement('span');
            countElement.className = 'result-count';
            countElement.textContent = count;
            
            listItem.appendChild(tokenElement);
            listItem.appendChild(countElement);
            container.appendChild(listItem);
        });
    }
});