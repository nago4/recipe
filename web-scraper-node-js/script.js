const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
    try {
        // URLを指定
        const url = 'https://cookpad.com/jp';

        // ウェブページを取得
        const { data } = await axios.get(url);

        // CheerioでHTMLを解析
        const $ = cheerio.load(data);
        
        // レシピのタイトルを取得（例）
        const title = $('h1.recipe-title').text().trim();
        // 材料や作り方を取得するための適切なセレクタを調べる必要があります
        const ingredients = $('#ingredients').text().trim(); // 適切なセレクタをご確認ください
        const instructions = $('#directions').text().trim();  // 適切なセレクタをご確認ください

        // 結果を表示
        console.log('タイトル:', title);
        console.log('材料:', ingredients);
        console.log('作り方:', instructions);
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
})();