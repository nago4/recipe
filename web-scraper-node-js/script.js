const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
    try {
        // URLを指定
        const url = 'https://cookpad.com/jp/recipes/24108941-%E5%AE%B6%E6%97%8F%E7%B5%B6%E8%B3%9B%E3%81%8B%E3%81%B4%E3%82%83%E3%81%AE%E3%82%AB%E3%83%AC%E3%83%BC%E3%83%9F%E3%83%BC%E3%83%88%E3%82%B0%E3%83%A9%E3%82%BF%E3%83%B3?ref=search_top';

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