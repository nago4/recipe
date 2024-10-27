from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json

driver = webdriver.Chrome()  # ブラウザの起動
driver.get('https://cookpad.com/jp/categories/1502')

# 特定のXPathを持つ<a>タグのhref属性とテキストを取得
elements = driver.find_elements(By.XPATH, '//*[@id="category-recipe-list"]/li/div/div/div/h2/a')
recipes = [(element.get_attribute("href"), element.text) for element in elements]

# リンク、料理名、材料リストをテキストファイルに保存
with open('sonota.txt', 'w', encoding='utf-8') as file:
    for i, (link, name) in enumerate(recipes, start=1):
        # 各レシピの材料リストを取得
        try:
            ingredients_element = driver.find_element(By.XPATH, f'//*[@id="category-recipe-list"]/li[{i}]/div[1]/div')
            ingredients_data = ingredients_element.get_attribute('data-ingredients-highlighter-ingredients-value')
            if ingredients_data:
                ingredients = json.loads(ingredients_data)  # JSON形式の文字列をリストに変換

                # リンク、料理名、材料リストをファイルに書き込む
                file.write(f"{name}: {link}\n")
                file.write("材料:\n")
                for ingredient in ingredients:
                    file.write(f"- {ingredient}\n")
                file.write("\n")
            else:
                print(f"No ingredients data found for {name}")
        except Exception as e:
            print(f"Error retrieving ingredients for {name}: {e}")

# ブラウザを閉じる
driver.quit()