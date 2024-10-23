from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()  # ブラウザの起動
driver.get('https://cookpad.com/jp/categories')

# 特定のクラスを持つ<li>要素内の<a>タグのhref属性を取得
elements = driver.find_elements(By.XPATH, "//li[contains(@class, 'block-link flex gap-sm py-sm items-center border-b border-cookpad-gray-400')]//a[@class='block-link__main text-cookpad-16 font-semibold']")
links = [element.get_attribute("href") for element in elements]

# リンクをテキストファイルに保存
with open('kategorisc.txt', 'w', encoding='utf-8') as file:
    for link in links:
        file.write(link + '\n')

# ブラウザを開いたままにするために待機
time.sleep(5)  # 5秒間待機

# ブラウザを閉じる
driver.quit()