import os

# フォルダのパス
folder_path = 'material'
input_folder_path = 'namelinkmaterial'

# フォルダが存在しない場合は作成
if not os.path.exists(folder_path):
    os.makedirs(folder_path)

# 入力フォルダ内のすべてのファイルを取得
input_files = [f for f in os.listdir(input_folder_path) if os.path.isfile(os.path.join(input_folder_path, f))]

# レシピ情報を解析する
recipes = []

for input_file in input_files:
    file_path = os.path.join(input_folder_path, input_file)
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    current_recipe = {}
    for line in lines:
        line = line.strip()
        if line.startswith('材料:'):
            current_recipe['材料'] = []
        elif line.startswith('- '):
            current_recipe['材料'].append(line[2:])
        elif line:
            if '料理名' in current_recipe:
                recipes.append(current_recipe)
            name, link = line.split(': ', 1)
            current_recipe = {'料理名': name, 'リンク': link}

    if '料理名' in current_recipe:
        recipes.append(current_recipe)

# 材料ごとにテキストファイルを作成し、対応する料理名とリンクを書き込む
ingredient_to_recipes = {}

for recipe in recipes:
    for ingredient in recipe['材料']:
        if ingredient not in ingredient_to_recipes:
            ingredient_to_recipes[ingredient] = []
        ingredient_to_recipes[ingredient].append(f"{recipe['料理名']}: {recipe['リンク']}")

for ingredient, recipe_list in ingredient_to_recipes.items():
    ingredient_file_path = os.path.join(folder_path, f'{ingredient}.txt')
    with open(ingredient_file_path, 'w', encoding='utf-8') as ingredient_file:
        for recipe_info in recipe_list:
            ingredient_file.write(f"{recipe_info}\n")

print("材料別にテキストファイルを作成しました。")