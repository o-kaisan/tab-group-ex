import { MessageType } from "../common/types/message";

chrome.runtime.onMessage.addListener(function (msg) {
    console.log("Received message:", msg);

    const text = "タブグループが保存されました";
    switch (msg.MessageType) {
        case MessageType.saveTabGroup: // タブグループの保存
            injectSnackbarFromBottomLeft(text);
            break;
        default:
            break;
    }
});

/*
 * スナックバーを左下から表示する
 *
 * 補足
 *   Reactコンポーネントで実装したかったが、コンパイルに膨大な時間がかかるため
 *   暫定対処としてJavaScript形式でSnackbarを実装する
 */
function injectSnackbarFromBottomLeft(text: string): void {
    const SNACKBAR_ELEMENT_ID = "tab-group-ex-bgs-snackbar";

    // すでに要素があるか確認
    const existing = document.getElementById(SNACKBAR_ELEMENT_ID);
    if (existing != null) {
        console.log("Existing snackbar found. Removing...");
        existing.remove(); // 既存要素があれば削除
    }

    // 新しい要素を作成して注入
    const snackbar = document.createElement("div");
    snackbar.id = SNACKBAR_ELEMENT_ID;
    snackbar.textContent = text;
    Object.assign(snackbar.style, {
        position: "fixed",
        bottom: "24px",
        left: "24px", // 左下に表示
        backgroundColor: "#333",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "8px",
        opacity: "0",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        zIndex: "9999",
        transform: "translateY(20px)", // 初期位置（少し下に）
    });

    document.body.appendChild(snackbar);

    // 表示アニメーション
    setTimeout(() => {
        snackbar.style.opacity = "1";
        snackbar.style.bottom = "50px";
    }, 10);

    // 非表示にして削除
    setTimeout(() => {
        snackbar.style.opacity = "0";
        snackbar.style.bottom = "30px";
        setTimeout(() => { snackbar.remove(); }, 300); // アニメーション後に削除
    }, 3000);
}

