URL:https://last-timer.web.app/

## 1.概要
「歯医者に前回いつ行ったかが分かるWebアプリ」です。  

それ以外にも「エアコン掃除を前回したのはいつか」のように年数回あるが、いつやったか忘れがちなイベントを記録することを想定しています。

### 1-1.本アプリのターゲット
ターゲットは自分です。  
（類似Androidアプリを使用していましたが、データがクラウドに保存されず、機種変更の際にデータが消えてしまうという問題点があったので自分でWebアプリを作りました）

### 1-2.サイト構成
```
/   .................   トップページ（ログイン済→実際のリストページ, 未ログイン→アプリ説明ページ）
/signup   ...........   ログイン
/signin   ...........   ログアウト
/resetpassword   ....   パスワード再設定メール送信のためのメールアドレス入力ページ
```

## 3.機能
* SPA(React, TypeScript)
* 認証（Firebase Authentication）
* パスワードを忘れたときに再設定メールを送信（Firebase Authentication）
  * ログインページにリンクがあります。 
  * ログインページでメールアドレス入力済であれば、再設定メール送信ページでもメールアドレス入力済の状態で遷移します。（react-router-domのuseHistory, useLocation）
* リストのデータ保存、変更、削除（Firebase Cloud Firestore）

## 4.使用技術
* React
  * create-react-app
  * Functinoal Components, React Hooks
  * Router（react-router-dom）
  * グローバルstate管理（Context API）
  * メモ化(React.memo, useCallback)
  * ライフサイクルフック(useEffect)
  * styled-components（レスポンシブ対応）
  * Atomic Design
* TypeScript
* ESLint
* Prettier
* Firebase
  * Authentication
  * Cloud Firestore
  * Hosting
