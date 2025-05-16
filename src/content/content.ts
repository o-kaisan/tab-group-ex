import { ActionType } from "../common/const/action";
import type { Message } from "../common/types/message";

chrome.runtime.onMessage.addListener(function (msg: Message) {
    let text: string
    switch (msg.actionType) {
        // タブグループの保存
        case ActionType.SAVE_GROUP:
            text = "Tab group saved";
            injectSnackbar(text);
            break;
        // タブをグループ化
        case ActionType.GROUP_ALL:
            text = "Grouped remaining tabs";
            injectSnackbar(text);
            break;
        case ActionType.GROUP_BY_DOMAIN:
            text = "Grouped tabs by domain";
            injectSnackbar(text);
            break;
        case ActionType.GROUP_BY_CUSTOM_DOMAIN:
            text = "Grouped tabs by custom domain";
            injectSnackbar(text);
            break;
        // タブグループを全て解除
        case ActionType.UNGROUP_ALL_GROUP:
            text = "Ungrouped all tab groups";
            injectSnackbar(text);
            break;
        // タブグループを閉じる
        case ActionType.CLOSE_GROUP:
            text = "Closed tab group";
            injectSnackbar(text);
            break;
        // タブを閉じる
        case ActionType.CLOSE_TAB:
            text = "Closed tab";
            injectSnackbar(text);
            break;
        // タブグループを復元
        case ActionType.RESTORE_GROUP:
            text = "Restored tab group";
            injectSnackbar(text);
            break;
        // タブを復元
        case ActionType.RESTORE_TAB:
            text = "Restored tab";
            injectSnackbar(text);
            break;
        // 保存済みのタブグループを削除
        case ActionType.DELETE_GROUP:
            text = "Deleted saved group";
            injectSnackbar(text);
            break;
        // 保存済みのタブグループからタブを削除
        case ActionType.DELETE_TAB:
            text = "Removed tab from group";
            injectSnackbar(text);
            break;
        default:
            break;
    }
});

/**
 * スナックバーを左下から表示する
 *
 * 補足
 *   Reactコンポーネントで実装したかったが、コンパイルに膨大な時間がかかるため
 *   暫定対処としてJavaScript形式でSnackbarを実装する
 */
function injectSnackbar(text: string): void {
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

