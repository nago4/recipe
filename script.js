let currentRecipes = [];

// レシピを検索する関数
function searchRecipes() {
    const ingredient = document.getElementById('ingredient').value.trim();
    const resultsDiv = document.getElementById('results');
    
    // 入力値の検証
    if (!ingredient) {
        showMessage('食材を入力してください', 'error');
        return;
    }

    // 検索結果をクリア
    clearResults();

    // ローディング表示
    showLoading();

    fetch(`material/${ingredient}.txt`)
        .then(response => {
            if (!response.ok) {
                throw new Error('該当するレシピが見つかりませんでした');
            }
            return response.text();
        })
        .then(data => {
            const recipes = data.trim().split('\n');
            currentRecipes = recipes.map(recipe => {
                const [name, link] = recipe.split(': ');
                return { name, link };
            });
            displayRecipes(currentRecipes);
        })
        .catch(error => {
            showMessage(error.message, 'error');
        })
        .finally(() => {
            hideLoading();
        });
}

// レシピを表示する関数
function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('results');
    clearResults();

    if (recipes.length === 0) {
        showMessage('レシピが見つかりませんでした', 'info');
        return;
    }

    recipes.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'recipe';

        const a = document.createElement('a');
        a.href = recipe.link;
        a.textContent = recipe.name;
        a.target = '_blank';
        a.rel = 'noopener noreferrer'; // セキュリティ対策

        div.appendChild(a);
        resultsDiv.appendChild(div);
    });
}

// 名前でソートする関数
function sortRecipesByName() {
    if (currentRecipes.length === 0) {
        showMessage('ソートするレシピがありません', 'info');
        return;
    }

    currentRecipes.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
    displayRecipes(currentRecipes);
}

// メッセージを表示する関数
function showMessage(message, type = 'info') {
    const resultsDiv = document.getElementById('results');
    clearResults();

    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    resultsDiv.appendChild(messageDiv);
}

// 検索結果をクリアする関数
function clearResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
}

// ローディング表示を追加する関数
function showLoading() {
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = '検索中...';
    resultsDiv.appendChild(loadingDiv);
}

// ローディング表示を削除する関数
function hideLoading() {
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// 入力フィールドでEnterキーを押したときの処理
document.getElementById('ingredient').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchRecipes();
    }
});

// ページ読み込み時にフォーカスを設定
window.addEventListener('load', () => {
    document.getElementById('ingredient').focus();
});