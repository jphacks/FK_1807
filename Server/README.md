# Serverプログラム

実行コマンド: node server.js

## 実行する時の注意
1. Node.jsをインストールする
2. Node.jsのモジュール(express)をインストールする
2'. 「npm install express」でインストール
3. 上記のコマンドを実行する

## expressモジュールについて
・サーバーを構築する際に簡単に構築することができるnode.jsのモジュール

## プログラムの流れ
1. モジュールをインクルードする
2. CORS(Cross-Origin Resource Sharing)を行う<br>
→ブラウザがオリジン(HTMLを読み込んだサーバのこと)以外のサーバからデータを取得する仕組み
3. app.postでpostが来た時の処理を記述
4. app.getでGETが来た時の処理を記述
