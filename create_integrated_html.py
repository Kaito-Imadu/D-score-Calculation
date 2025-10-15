#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
統合版HTMLを作成するスクリプト
女子版と男子版のHTMLファイルの<body>内容を抽出して統合
"""

import re
import os

def extract_body_content(html_file):
    """HTMLファイルから<body>タグの内容を抽出"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # <body>タグの内容を抽出（タグ自体は除く）
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
    if body_match:
        body_content = body_match.group(1).strip()

        # 不要なスクリプトタグを削除
        # gymnastics_d_score.jsの読み込みを削除（動的読み込みに変更するため）
        body_content = re.sub(r'<script\s+src=["\']gymnastics_d_score\.js["\'][^>]*></script>', '', body_content, flags=re.IGNORECASE)

        # データベースファイルの読み込みを削除（男子版のみ、使用しないため）
        body_content = re.sub(r'<script\s+src=["\']floor_skills\.js["\'][^>]*></script>', '', body_content, flags=re.IGNORECASE)
        body_content = re.sub(r'<script\s+src=["\']pommel_skills\.js["\'][^>]*></script>', '', body_content, flags=re.IGNORECASE)
        body_content = re.sub(r'<script\s+src=["\']rings_skills\.js["\'][^>]*></script>', '', body_content, flags=re.IGNORECASE)
        body_content = re.sub(r'<script\s+src=["\']parallel_skills\.js["\'][^>]*></script>', '', body_content, flags=re.IGNORECASE)
        body_content = re.sub(r'<script\s+src=["\']highbar_skills\.js["\'][^>]*></script>', '', body_content, flags=re.IGNORECASE)
        body_content = re.sub(r'<script\s+src=["\']skills_database\.js["\'][^>]*></script>', '', body_content, flags=re.IGNORECASE)

        return body_content
    return ""

def extract_head_content(html_file):
    """HTMLファイルから<head>タグの内容を抽出（参考用）"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    head_match = re.search(r'<head[^>]*>(.*?)</head>', content, re.DOTALL | re.IGNORECASE)
    if head_match:
        return head_match.group(1).strip()
    return ""

def create_integrated_html():
    """統合版HTMLを作成"""

    # ソースファイルのパス
    women_html = r"C:\Users\今津快斗\Kaito-Imadu\women-D-score-Calculation\index.html"
    men_html = r"C:\Users\今津快斗\Kaito-Imadu\men-D-score-Calculation\index.html"
    output_html = r"C:\Users\今津快斗\Kaito-Imadu\D-score-Calculation\index.html"

    # body内容を抽出
    women_body = extract_body_content(women_html)
    men_body = extract_body_content(men_html)

    # 統合HTMLテンプレート
    integrated_html = f'''<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>体操競技 Dスコア計算システム</title>
    <style>
        /* 性別選択画面のスタイル */
        .gender-selection-overlay {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }}

        .gender-selection-overlay h1 {{
            color: white;
            font-size: 2.5rem;
            margin-bottom: 50px;
        }}

        .gender-buttons {{
            display: flex;
            gap: 40px;
        }}

        .gender-btn {{
            background: white;
            border: none;
            border-radius: 20px;
            padding: 40px 60px;
            font-size: 2rem;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transition: all 0.3s;
        }}

        .gender-btn:hover {{
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }}

        .hidden {{
            display: none !important;
        }}

        @media (max-width: 768px) {{
            .gender-buttons {{
                flex-direction: column;
                gap: 20px;
            }}
            .gender-btn {{
                padding: 30px 50px;
                font-size: 1.5rem;
            }}
        }}
    </style>
</head>
<body>
    <!-- 性別選択画面 -->
    <div id="gender-selection" class="gender-selection-overlay">
        <h1>🤸 体操競技 Dスコア計算システム</h1>
        <div class="gender-buttons">
            <button class="gender-btn" onclick="selectGender('women')">
                👩 女子体操
            </button>
            <button class="gender-btn" onclick="selectGender('men')">
                👨 男子体操
            </button>
        </div>
    </div>

    <!-- 女子版アプリ -->
    <div id="women-app" class="hidden">
{women_body}
    </div>

    <!-- 男子版アプリ -->
    <div id="men-app" class="hidden">
{men_body}
    </div>

    <!-- 性別選択スクリプト -->
    <script>
        let currentGender = null;
        let scriptLoaded = {{ women: false, men: false }};

        function selectGender(gender) {{
            currentGender = gender;

            // 性別選択画面を非表示
            document.getElementById('gender-selection').classList.add('hidden');

            // 選択されたアプリを表示
            document.getElementById(gender + '-app').classList.remove('hidden');

            // 対応するJSファイルを読み込む
            if (!scriptLoaded[gender]) {{
                const script = document.createElement('script');
                script.src = gender + '_gymnastics_d_score.js';
                document.body.appendChild(script);
                scriptLoaded[gender] = true;
            }}
        }}
    </script>
</body>
</html>'''

    # ファイルに書き込み
    with open(output_html, 'w', encoding='utf-8') as f:
        f.write(integrated_html)

    print(f"[OK] Integrated HTML created: {output_html}")
    print(f"  - Women body: {len(women_body)} chars")
    print(f"  - Men body: {len(men_body)} chars")

if __name__ == "__main__":
    create_integrated_html()
