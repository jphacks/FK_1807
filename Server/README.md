# Serverプログラム

## Dependency
- 使用言語
  - Node.js
- データベース
  - mongodb

## Setup
- Node.js環境構築
  - npm install

## Usage
- 実行コマンド
  - npm start
- create
  - 実行時に一度だけデータベースのテーブル作成
- read
  - アプリ側にデータの送信
  - 1以上の数があるものだけを選び出して送信
- update
  - Raspi(冷蔵庫側)からデータの取得
  - テーブルに存在するものをカウントする