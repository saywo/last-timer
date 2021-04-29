URL:https://last-timer.web.app/

## 概要
「歯医者に前回いつ行ったかが分かるWebアプリ」です。  
歯医者以外にも「前回エアコン掃除をいつしたか」のように、年に数回あるがいつやったか忘れがちなイベントを記録しておけます。  

（類似Androidアプリがあり自分も使用していましたが、データがクラウドに保存されず機種変更の際にデータが消えてしまうという問題点があったので自分でWebアプリを作りました）

## 機能
* SPA(React, TypeScript)
* 認証（Firebase Authentication）
* リストのデータ保存、変更、削除（Firebase Cloud Firestore）

## 使用技術
* React
  * create-react-app
  * Functinoal Components, React hooks
  * グローバルでのstate管理（Context API）
  * メモ化(React.memo, useCallback)
  * ライフサイクルフック(useEffect)
  * Atomic Desing
* TypeScript
* ESLint
* Prettier
* styled-components（レスポンシブ対応）
* Firebase Hosting
