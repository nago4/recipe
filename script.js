document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const menuButton = document.querySelector('.menu-button');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const scanButton = document.querySelector('.scan-button');
    const resultsContainer = document.getElementById('resultsContainer');
    const scanContainer = document.getElementById('scanFrame');

    // メニューの開閉
    menuButton.addEventListener('click', () => {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
    });

    menuOverlay.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
    });

    // スキャンボタンのクリックイベント
    scanButton.addEventListener('click', () => {
        // カメラ起動（実際のアプリではここでカメラAPIを使用）
        setTimeout(() => {
            // デモ用：スキャン後の結果表示
            scanContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
        }, 1000);
    });

    // 戻る機能（結果画面から戻る）
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resultsContainer.style.display === 'block') {
            resultsContainer.style.display = 'none';
            scanContainer.style.display = 'flex';
        }
    });
});