import os

# フォルダのパス
folder_path = 'material'

# フォルダが存在しない場合は作成
if not os.path.exists(folder_path):
    os.makedirs(folder_path)

# sarada.txt ファイルのパス
file_path = 'namelinkmaterial/sarada.txt'

# ファイルを読み込む
with open(file_path, 'r', encoding='utf-8') as file:
    lines = file.readlines()

# レシピ情報を解析する
recipes = []
current_recipe = {}
for line in lines:
    line = line.strip()
    if line.startswith('材料:'):
        current_recipe['材料'] = []
    elif line.startswith('- '):
        current_recipe['材料'].append(line[2:])
    elif line:
        if current_recipe:
            recipes.append(current_recipe)
        name, link = line.split(': ', 1)
        current_recipe = {'料理名': name, 'リンク': link}

if current_recipe:
    recipes.append(current_recipe)

# 材料ごとにテキストファイルを作成し、対応する料理名とリンクを書き込む
for recipe in recipes:
    for ingredient in recipe['材料']:
        ingredient_file_path = os.path.join(folder_path, f'{ingredient}.txt')
        with open(ingredient_file_path, 'a', encoding='utf-8') as ingredient_file:
            ingredient_file.write(f"{recipe['料理名']}: {recipe['リンク']}\n")

print("材料別にテキストファイルを作成しました。")