from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()  # ブラウザの起動
driver.get('https://cookpad.com/jp')

# rel="nofollow"のaタグのhref属性を取得
elements = driver.find_elements(By.XPATH, "//a[@href ]")
links = [element.get_attribute("href") for element in elements]

# リンクをテキストファイルに保存
with open('nofollow_links.txt', 'w', encoding='utf-8') as file:
    for link in links:
        file.write(link + '\n')

# ブラウザを開いたままにするために待機
time.sleep(5)  # 30秒間待機

# ブラウザを閉じる
driver.quit()