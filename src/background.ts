function polling() {
  console.log("polling");

  setTimeout(polling, 1000 * 30);
}

polling();

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "MarkDownリンクとしてコピー",
    contexts: ["selection"],
    // "onclick": copytext()
  });
});

// コンテキストメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sampleContextMenu") {
    console.log("Context menu clicked!");
    // ここにクリック時の動作を追加
    alert("tst")

  }
});

function copytext(): ((info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void) | undefined {
  alert("tst")
  return undefined;
}
