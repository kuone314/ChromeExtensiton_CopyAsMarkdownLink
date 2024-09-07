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
  });
});

// コンテキストメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sampleContextMenu") {
    const url = info.frameUrl ?? info.pageUrl;
    const txt = "[" + info.selectionText + "](" + url + ")";
    console.log(txt);
  }
});


