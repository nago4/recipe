document.addEventListener('DOMContentLoaded', function() {
    const cameraInput = document.getElementById('camera-input');
    const scanButton = document.querySelector('.scan-button');

    // カメラ入力の処理
    cameraInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // ここで撮影された画像を処理
            handleImage(file);
        }
    });

    // スキャンボタンのアニメーション効果
    scanButton.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });

    scanButton.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });

    // タッチデバイス用のイベント
    scanButton.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });

    scanButton.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });

    // 画像処理関数（ここではダミー関数として実装）
    function handleImage(file) {
        // 実際のPython処理との連携部分
        console.log('画像が選択されました:', file.name);
        
        // ここで画像をサーバーに送信する処理を実装
        // 例: FormDataを使用してサーバーにアップロード
        const formData = new FormData();
        formData.append('image', file);

        // 実際のアップロード処理（コメントアウト）
        /*
        fetch('/api/scan', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // レシピ提案の処理
            console.log('レシピデータ:', data);
        })
        .catch(error => {
            console.error('エラー:', error);
        });
        */
    }
});